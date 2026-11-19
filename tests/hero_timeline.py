"""Run with python3 tests/hero_timeline.py against the running preview."""
import asyncio
from playwright.async_api import async_playwright, expect

BROADCAST = "#hero .timeline-broadcast .broadcast-text"
TYPED = "#hero .hero-typed"
WORDS = "#hero .hero-typed .reveal-phase-word"
INTRO = "Welcome to my corner of the multiverse — Mars-0321."
MISSION = (
    "In this timeline, I design and build accessible web products, from sharp "
    "interfaces to resilient full-stack systems."
)
FULL = f"{INTRO} {MISSION}"


async def check():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1280, "height": 1800}, reduced_motion="reduce")
        await page.goto("http://localhost:8080", wait_until="networkidle")
        # Mars is the timeline everyone lands on.
        assert "mars" in await page.locator("#hero .timeline-image--active").evaluate("img => img.getAttribute('src')")
        assert await page.locator(BROADCAST).inner_text() == "TRANSMITTING FROM Mars-0321"
        assert "Mars-0321" in await page.locator(TYPED).inner_text() and "In this timeline" in await page.locator(TYPED).inner_text()
        # Reduced motion shows the transmission tag already decoded.
        await page.get_by_role("button", name="Switch timeline to Earth-2337").click()
        await expect(page.locator(TYPED)).to_contain_text("Earth-2337")
        assert await page.locator("#hero [role=status]").inner_text() == "Timeline changed to Earth-2337."
        assert await page.locator("#hero .timeline-image--active").evaluate("img => img.complete && img.naturalWidth > 0")
        await page.get_by_role("button", name="Switch timeline to Mars-0321").click()
        await expect(page.locator(TYPED)).to_contain_text("Mars-0321")
        for width in [393, 613, 1280]:
            await page.set_viewport_size({"width": width, "height": 747 if width < 768 else 1800})
            assert await page.evaluate("document.documentElement.scrollWidth <= window.innerWidth")
        await browser.close()


async def check_decode():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1280, "height": 1800}, reduced_motion="no-preference")
        await page.goto("http://localhost:8080", wait_until="domcontentloaded")
        # The introduction phase-reveals: the words are in the DOM but still
        # drifting in, and the mission line has not landed yet.
        await page.wait_for_selector(WORDS)
        mid = await page.locator(WORDS).first.evaluate("el => getComputedStyle(el).opacity")
        assert float(mid) < 1, f"first intro word should still be fading in, got opacity {mid}"
        assert MISSION not in await page.locator(TYPED).inner_text()
        # The tag flickers through glyphs before settling on the real text.
        await expect(page.locator(BROADCAST)).not_to_have_text("TRANSMITTING FROM Mars-0321", timeout=2000)
        await expect(page.locator(BROADCAST)).to_have_text("TRANSMITTING FROM Mars-0321", timeout=5000)
        # Screen readers always get the final text, never the glyph soup.
        assert await page.locator("#hero .timeline-broadcast .sr-only").inner_text() == "TRANSMITTING FROM Mars-0321"
        await expect(page.locator(TYPED)).to_have_text(FULL, timeout=6000)
        await page.get_by_role("button", name="Switch timeline to Earth-2337").click()
        await expect(page.locator(BROADCAST)).to_have_text("TRANSMITTING FROM Earth-2337", timeout=5000)
        await expect(page.locator(TYPED)).to_contain_text("Earth-2337", timeout=6000)
        # Narrow screens reflow while the reveal is running, not just after it.
        await page.set_viewport_size({"width": 393, "height": 747})
        await page.reload(wait_until="domcontentloaded")
        await page.wait_for_selector(WORDS)
        assert await page.evaluate("document.documentElement.scrollWidth <= window.innerWidth")
        await expect(page.locator(TYPED)).to_have_text(FULL, timeout=6000)
        assert await page.evaluate("document.documentElement.scrollWidth <= window.innerWidth")
        await browser.close()


asyncio.run(check())
asyncio.run(check_decode())
print("PASS: Mars default, phase-revealed introduction, rune-decoded tag, narrow-screen reflow.")
