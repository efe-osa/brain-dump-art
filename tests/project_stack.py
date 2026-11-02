"""Every project remains reachable through the scroll-driven stack."""
import asyncio
from playwright.async_api import async_playwright

TITLES = ["Lemur Cloud Portal", "Everyfarmer — Service Provider", "Equal Measures 2030", "Read it"]

async def check():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1053, "height": 727})
        await page.goto("http://localhost:8080")
        await page.evaluate("document.fonts.ready")
        links = page.locator("#projects li a")
        assert await links.count() == 4
        for i, title in enumerate(TITLES):
            await page.locator('.project-track').evaluate("""(el,i)=>window.scrollTo(0,
                window.scrollY+el.getBoundingClientRect().top-
                parseFloat(getComputedStyle(document.documentElement).fontSize)*5.5+i*innerHeight*0.65)""", i)
            await page.wait_for_timeout(100)
            assert await page.locator('#projects h2 [aria-hidden]').inner_text() == title
            assert await links.nth(i).evaluate("""(el)=>{
                const r=el.getBoundingClientRect();
                return el.contains(document.elementFromPoint(r.x+r.width/2,r.y+r.height/2));
            }"""), f"Wrong project revealed: {title}"
        await page.locator('.project-track').evaluate("""el=>window.scrollTo(0,
            window.scrollY+el.getBoundingClientRect().top-
            parseFloat(getComputedStyle(document.documentElement).fontSize)*5.5+innerHeight*0.65*0.5)""")
        await page.wait_for_timeout(100)
        bounds = await links.nth(1).bounding_box()
        assert bounds == await links.first.bounding_box(), 'Reveal must stay in the existing card frame'
        for mode in ["", "dark", "high-contrast", "dark high-contrast"]:
            await page.evaluate("(mode)=>document.documentElement.className=mode", mode)
            await links.first.focus()
            for i, title in enumerate(TITLES):
                if i:
                    await page.keyboard.press("Tab")
                link = links.nth(i)
                await page.wait_for_timeout(100)
                assert await page.get_by_role("link", name=f"{title} (opens in a new tab)", exact=True).count() == 1
                assert await link.evaluate("(el)=>document.activeElement===el")
                assert await link.evaluate("""(el)=>{
                    const r=el.getBoundingClientRect();
                    return r.top>=0 && r.bottom<=innerHeight &&
                        el.contains(document.elementFromPoint(r.x+r.width/2,r.y+r.height/2));
                }"""), f"Covered keyboard destination: {title}, {mode}"
            for i in [2, 1, 0]:
                await page.keyboard.press("Shift+Tab")
                assert await links.nth(i).evaluate("(el)=>document.activeElement===el")
        await page.emulate_media(reduced_motion="reduce")
        await page.wait_for_timeout(100)
        assert await page.locator(".project-stack-item").first.evaluate("(el)=>getComputedStyle(el).position") == "static"
        await page.emulate_media(reduced_motion="no-preference")
        await page.set_viewport_size({"width": 390, "height": 844})
        await page.evaluate("document.documentElement.style.fontSize='200%'")
        await page.wait_for_timeout(100)
        assert await page.locator(".project-stack-item").first.evaluate("(el)=>getComputedStyle(el).position") == "static"
        assert await page.locator("#projects").evaluate("(el)=>el.scrollWidth<=el.clientWidth")
        await browser.close()

asyncio.run(check())
print("Project stack accessibility checks passed.")