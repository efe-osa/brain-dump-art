"""Run with python3 tests/reduced_motion.py against the running preview."""
import asyncio
from playwright.async_api import async_playwright


async def check_reduced_motion():
    async with async_playwright() as playwright:
        browser = await playwright.chromium.launch(headless=True)
        context = await browser.new_context(
            viewport={"width": 1280, "height": 1800}, reduced_motion="reduce"
        )
        page = await context.new_page()
        await page.goto("http://localhost:8080", wait_until="networkidle")
        # Reduced motion shows final content without typing or counting.
        assert await page.locator("h1 [aria-hidden=true]").inner_text() == "Efe Jessye"
        assert await page.locator("#about p.text-primary [aria-hidden=true]").all_inner_texts() == [
            "7+", "250K+", "90%", "80%"
        ]

        await page.emulate_media(reduced_motion="no-preference")
        await page.reload(wait_until="domcontentloaded")
        await page.wait_for_timeout(160)
        assert await page.locator("h1 [aria-hidden=true]").inner_text() != "Efe Jessye"
        # Changing the preference live must finish an active animation immediately.
        await page.emulate_media(reduced_motion="reduce")
        await page.wait_for_timeout(100)
        assert await page.locator("h1 [aria-hidden=true]").inner_text() == "Efe Jessye"
        assert await page.locator("#about p.text-primary [aria-hidden=true]").all_inner_texts() == [
            "7+", "250K+", "90%", "80%"
        ]
        await browser.close()


asyncio.run(check_reduced_motion())
print("PASS: initial and live reduced-motion preferences show final content.")