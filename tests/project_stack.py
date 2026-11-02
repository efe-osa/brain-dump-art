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
        for mode in ["", "dark", "high-contrast", "dark high-contrast"]:
            await page.evaluate("(mode)=>document.documentElement.className=mode", mode)
            await links.first.focus()
            for i, title in enumerate(TITLES):
                if i:
                    await page.keyboard.press("Tab")
                link = links.nth(i)
                assert title in await link.inner_text()
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