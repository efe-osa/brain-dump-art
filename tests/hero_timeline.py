"""Run with python3 tests/hero_timeline.py against the running preview."""
import asyncio
from playwright.async_api import async_playwright, expect


async def check():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1280, "height": 1800}, reduced_motion="reduce")
        await page.goto("http://localhost:8080", wait_until="networkidle")
        assert "Mars-0321" in await page.locator("#hero .hero-typed").inner_text()
        await page.get_by_role("button", name="Switch timeline to Earth-2337").click()
        await expect(page.locator("#hero .hero-typed")).to_contain_text("Earth-2337")
        assert await page.locator("#hero [role=status]").inner_text() == "Timeline changed to Earth-2337."
        assert await page.locator("#hero .timeline-image--active").evaluate("img => img.complete && img.naturalWidth > 0")
        await page.get_by_role("button", name="Switch timeline to Mars-0321").click()
        await expect(page.locator("#hero .hero-typed")).to_contain_text("Mars-0321")
        for width in [393, 613, 1280]:
            await page.set_viewport_size({"width": width, "height": 747 if width < 768 else 1800})
            assert await page.evaluate("document.documentElement.scrollWidth <= window.innerWidth")
        await browser.close()


asyncio.run(check())
print("PASS: both timelines, loaded imagery and narrow-screen reflow.")