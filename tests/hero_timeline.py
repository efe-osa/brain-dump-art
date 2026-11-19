"""Run with python3 tests/hero_timeline.py against the running preview."""
import asyncio
from playwright.async_api import async_playwright, expect

BROADCAST = "#hero .timeline-broadcast .broadcast-text"


async def check():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1280, "height": 1800}, reduced_motion="reduce")
        await page.goto("http://localhost:8080", wait_until="networkidle")
        assert "Mars-0321" in await page.locator("#hero .hero-typed").inner_text() and "In this timeline" in await page.locator("#hero .hero-typed").inner_text()
        # Reduced motion shows the transmission tag already decoded.
        assert await page.locator(BROADCAST).inner_text() == "TRANSMITTING FROM Mars-0321"
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


async def check_decode():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1280, "height": 1800}, reduced_motion="no-preference")
        await page.goto("http://localhost:8080", wait_until="domcontentloaded")
        # The tag flickers through glyphs before settling on the real text.
        await expect(page.locator(BROADCAST)).not_to_have_text("TRANSMITTING FROM Mars-0321", timeout=2000)
        await expect(page.locator(BROADCAST)).to_have_text("TRANSMITTING FROM Mars-0321", timeout=5000)
        # Screen readers always get the final text, never the glyph soup.
        assert await page.locator("#hero .timeline-broadcast .sr-only").inner_text() == "TRANSMITTING FROM Mars-0321"
        await page.get_by_role("button", name="Switch timeline to Earth-2337").click()
        await expect(page.locator(BROADCAST)).to_have_text("TRANSMITTING FROM Earth-2337", timeout=5000)
        await browser.close()


asyncio.run(check())
asyncio.run(check_decode())
print("PASS: both timelines, loaded imagery, narrow-screen reflow and rune-decoded transmission tag.")
