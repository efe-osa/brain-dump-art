"""Catalog grounding and finder states. Set LIVE_AI_TEST=1 for a paid Gateway check."""
import asyncio
import json
import os
from pathlib import Path
from playwright.async_api import async_playwright

ROOT = Path(__file__).resolve().parents[1]
CATALOG = json.loads((ROOT / 'supabase/functions/portfolio-recommendations/catalog.json').read_text())

def check_catalog():
    for item in CATALOG:
        source = (ROOT / ('src/components/Projects.tsx' if item['kind'] == 'project' else 'src/components/Blog.tsx')).read_text()
        assert item['title'] in source, f"Stale catalog title: {item['id']}"
        assert item['url'] in source, f"Stale catalog destination: {item['id']}"
        for tag in item['tags']:
            assert tag in source, f"Stale catalog tag: {tag}"

async def check_browser():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={'width': 1280, 'height': 1800})
        if os.environ.get('LIVE_AI_TEST') != '1':
            count = 0
            async def respond(route):
                nonlocal count
                count += 1
                if count == 1:
                    selected = [next(x for x in CATALOG if x['id'] == key) for key in ['everyfarmer', 'web-development-guide']]
                    payload = {'type': 'result', 'summary': 'Two relevant matches.', 'recommendations': [{**x, 'reason': 'Relevant to your request.'} for x in selected]}
                elif count == 2:
                    payload = {'type': 'result', 'summary': 'No close match in this portfolio.', 'recommendations': []}
                else:
                    payload = {'type': 'error', 'status': 402, 'message': 'AI credits are unavailable.'}
                await route.fulfill(status=200, content_type='application/x-ndjson', body=json.dumps(payload)+'\n')
            await page.route('**/functions/v1/portfolio-recommendations', respond)
        await page.goto('http://localhost:8080')
        query = page.get_by_label('Your interests or the challenge')
        toggle = page.get_by_role('button', name='Find work that fits your interests')
        assert await toggle.get_attribute('aria-expanded') == 'false'
        assert not await query.is_visible()
        await toggle.focus()
        await page.keyboard.press('Enter')
        assert await toggle.get_attribute('aria-expanded') == 'true'
        await query.fill('React projects using geospatial maps and a beginner guide to web development')
        await page.get_by_role('button', name='Find relevant work', exact=True).click()
        await page.wait_for_function("!document.querySelector('#portfolio-query').disabled", timeout=180000)
        links = page.locator('#find-work li a')
        assert await links.count() >= 2
        destinations = await links.evaluate_all('(a)=>a.map(x=>x.href)')
        assert 'https://everyfarmer.farm/' in destinations
        assert any('programming-beginners-guide' in x for x in destinations)
        assert all(url in [x['url'] for x in CATALOG] for url in destinations)
        await toggle.focus()
        await page.keyboard.press('Space')
        assert not await query.is_visible()
        await page.keyboard.press('Enter')
        assert await query.input_value() == 'React projects using geospatial maps and a beginner guide to web development'
        assert await links.count() >= 2
        if os.environ.get('LIVE_AI_TEST') != '1':
            await query.fill('Underwater archaeology')
            await page.get_by_role('button', name='Find relevant work', exact=True).click()
            await page.get_by_text('No close matches found.', exact=True).wait_for()
            assert await links.count() == 0
            await query.fill('React')
            await page.get_by_role('button', name='Find relevant work', exact=True).click()
            await page.get_by_role('alert').wait_for()
            assert 'AI credits are unavailable.' in await page.get_by_role('alert').inner_text()
            assert await query.input_value() == 'React'
        await page.set_viewport_size({'width': 390, 'height': 844})
        await page.evaluate("document.documentElement.style.fontSize='200%'")
        await page.locator('#find-work').scroll_into_view_if_needed()
        assert await page.locator('#find-work').evaluate('(el)=>el.scrollWidth <= el.clientWidth'), 'Finder must reflow without horizontal scrolling'
        await page.locator('#find-work').screenshot(path='/tmp/browser/portfolio-finder/mobile.png')
        await browser.close()

check_catalog()
asyncio.run(check_browser())
print('Portfolio recommendation checks passed.')