"""Run with python3 tests/reduced_motion.py against the running preview."""
import asyncio
from playwright.async_api import async_playwright, expect

INTRO = "Welcome to my corner of the multiverse — Mars-0321."
MISSION = (
    "In this timeline, I design and build accessible web products, from sharp "
    "interfaces to resilient full-stack systems."
)
FULL = f"{INTRO} {MISSION}"
TYPED = "#hero .hero-typed"
WORDS = "#hero .hero-typed .intro-rune"
STATS = ["7+", "250K+", "90%", "80%"]


async def check_reduced_motion():
    async with async_playwright() as playwright:
        browser = await playwright.chromium.launch(headless=True)
        context = await browser.new_context(
            viewport={"width": 1280, "height": 1800}, reduced_motion="reduce"
        )
        page = await context.new_page()
        await page.goto("http://localhost:8080", wait_until="networkidle")
        # Reduced motion shows the finished copy with no reveal and no counting.
        assert await page.locator(TYPED).inner_text() == FULL
        assert await page.locator("#about p.text-primary [aria-hidden=true]").all_inner_texts() == STATS

        # With motion allowed the words are in the DOM but still arriving, and
        # the mission line has not landed yet.
        await page.emulate_media(reduced_motion="no-preference")
        await page.reload(wait_until="domcontentloaded")
        await page.wait_for_selector(WORDS)
        mid = await page.locator(WORDS).first.inner_text()
        assert "Welcome to my corner" not in mid, f"intro should still be decoding, got {mid}"
        assert MISSION not in await page.locator(TYPED).inner_text()

        # Changing the preference live must finish the reveal immediately.
        await page.emulate_media(reduced_motion="reduce")
        await page.wait_for_timeout(100)
        assert await page.locator(TYPED).inner_text() == FULL
        assert await page.locator("#hero p a[href='/experience']").is_visible()
        assert await page.locator("#about p.text-primary [aria-hidden=true]").all_inner_texts() == STATS

        # A normal no-preference load also settles on the same copy.
        await page.emulate_media(reduced_motion="no-preference")
        await page.reload(wait_until="domcontentloaded")
        await expect(page.locator(TYPED)).to_have_text(FULL, timeout=6000)
        await browser.close()


asyncio.run(check_reduced_motion())
print("PASS: initial and live reduced-motion preferences show final content.")
