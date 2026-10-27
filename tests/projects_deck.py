"""Run with python3 tests/projects_deck.py against the running preview."""
import asyncio
from playwright.async_api import async_playwright


async def check_deck():
    async with async_playwright() as playwright:
        browser = await playwright.chromium.launch(headless=True)

        # Normal motion: deck items are sticky with increasing top offsets.
        context = await browser.new_context(viewport={"width": 1280, "height": 1800})
        page = await context.new_page()
        await page.goto("http://localhost:8080", wait_until="networkidle")
        items = page.locator("#projects .project-deck__item")
        assert await items.count() == 4, "expected 4 stacked cards"
        for index in range(4):
            style = await items.nth(index).evaluate(
                "el => ({ position: getComputedStyle(el).position, top: getComputedStyle(el).top })"
            )
            assert style["position"] == "sticky", f"item {index} should be sticky, got {style['position']}"
        tops = [float((await items.nth(i).evaluate("el => getComputedStyle(el).top")).replace("px", "")) for i in range(4)]
        assert tops == sorted(tops) and tops[0] < tops[-1], f"top offsets should increase, got {tops}"
        titles = await page.locator("#projects h3").all_inner_texts()
        assert titles[0].startswith("Lemur Cloud Portal"), f"unexpected order: {titles}"
        assert await page.locator("#projects a.group[href]").count() == 4, "each card must be a link"
        await context.close()

        # Reduced motion: deck falls back to a plain static list.
        context = await browser.new_context(
            viewport={"width": 1280, "height": 1800}, reduced_motion="reduce"
        )
        page = await context.new_page()
        await page.goto("http://localhost:8080", wait_until="networkidle")
        style = await page.locator("#projects .project-deck__item").first.evaluate(
            "el => getComputedStyle(el).position"
        )
        assert style == "static", f"reduced motion should be static, got {style}"
        await context.close()

        await browser.close()
        print("projects_deck: OK")


asyncio.run(check_deck())
