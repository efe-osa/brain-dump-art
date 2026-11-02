"""Every project remains reachable in the directly selectable image gallery."""
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright, expect

TITLES = ["Lemur Cloud Portal", "Everyfarmer — Service Provider", "Equal Measures 2030", "Read it"]
URLS = ["https://www.br.ink/lemur", "https://everyfarmer.farm/", "https://equalmeasures2030.org/", "https://fervent-bhabha-e5febb.netlify.app/"]

async def check():
    Path('/tmp/browser/project-gallery').mkdir(parents=True, exist_ok=True)
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1280, "height": 1800})
        errors = []
        page.on('pageerror', lambda error: errors.append(str(error)))
        await page.goto("http://localhost:8080", wait_until='networkidle')
        await page.evaluate('document.fonts.ready')
        gallery = page.locator('#projects')
        await gallery.scroll_into_view_if_needed()
        for i, title in enumerate(TITLES):
            tab = page.get_by_role('tab', name=title, exact=True)
            await tab.click()
            assert await tab.get_attribute('aria-selected') == 'true'
            panel = page.get_by_role('tabpanel', name=title, exact=True)
            link = panel.get_by_role('link', name=f'{title} (opens in a new tab)', exact=True)
            assert await link.get_attribute('href') == URLS[i]
            assert await panel.locator('p').inner_text()
            assert await panel.locator('img').evaluate('el=>el.complete && el.naturalWidth>0')
        for mode in ['', 'dark', 'high-contrast', 'dark high-contrast']:
            await page.evaluate('(mode)=>document.documentElement.className=mode', mode)
            await page.get_by_role('tab', name=TITLES[0], exact=True).focus()
            await expect(page.get_by_role('tab', name=TITLES[0], exact=True)).to_have_attribute('aria-selected', 'true')
            position = await page.evaluate('window.scrollY')
            for title in TITLES[1:] + TITLES[:1]:
                await page.keyboard.press('ArrowRight')
                tab = page.get_by_role('tab', name=title, exact=True)
                await expect(tab).to_have_attribute('aria-selected', 'true')
                assert await tab.evaluate('el=>document.activeElement===el')
                assert abs(await page.evaluate('window.scrollY') - position) < 2, 'Selection should not scroll the page'
        await page.evaluate('document.documentElement.className=""')
        await gallery.screenshot(path='/tmp/browser/project-gallery/desktop.png')
        await page.emulate_media(reduced_motion='reduce')
        await page.get_by_role('tab', name='Read it', exact=True).click()
        assert await page.get_by_role('tabpanel', name='Read it', exact=True).is_visible()
        await page.set_viewport_size({'width':390, 'height':844})
        await page.evaluate('document.documentElement.style.fontSize="200%"')
        for title in TITLES:
            await page.get_by_role('tab', name=title, exact=True).click()
            assert await page.get_by_role('tabpanel', name=title, exact=True).is_visible()
            assert await gallery.evaluate('el=>el.scrollWidth<=el.clientWidth')
        await page.evaluate('document.documentElement.style.fontSize="100%"')
        await gallery.screenshot(path='/tmp/browser/project-gallery/mobile.png')
        assert not errors, errors
        await browser.close()

asyncio.run(check())
print('PASS: gallery selection, destination links, images, arrow keys, stable scroll, reduced motion and mobile reflow.')
