"""Run with python3 tests/copy_email.py against the running preview."""
import asyncio

from playwright.async_api import async_playwright

EMAIL = "eosawaruoyelade@gmail.com"
ORIGIN = "http://localhost:8080"


async def check_copy_email():
    async with async_playwright() as playwright:
        browser = await playwright.chromium.launch(headless=True)
        context = await browser.new_context(viewport={"width": 1280, "height": 900})
        await context.grant_permissions(["clipboard-read", "clipboard-write"], origin=ORIGIN)
        page = await context.new_page()
        await page.goto(ORIGIN, wait_until="networkidle")

        button = page.get_by_role("button", name=f"Copy email address {EMAIL}")
        assert await button.count() == 1, "expected exactly one copy-email button in the hero"

        await button.click()
        assert await page.evaluate("navigator.clipboard.readText()") == EMAIL, (
            "clipboard should hold the address after clicking the button"
        )

        toast = page.locator("[data-sonner-toast]").first
        assert "Email copied to clipboard" in await toast.inner_text()
        assert EMAIL in await toast.inner_text(), "toast must show the address it copied"

        # The button confirms on its own, then returns to its default label.
        assert "Email copied" in await button.inner_text()
        await page.wait_for_timeout(2600)
        assert "Copy email" in await button.inner_text()

        # Keyboard activation behaves the same as a click.
        await button.focus()
        await page.keyboard.press("Enter")
        await page.wait_for_timeout(300)
        assert "Email copied to clipboard" in await page.locator("[data-sonner-toast]").first.inner_text()
        assert await page.evaluate("navigator.clipboard.readText()") == EMAIL

        await browser.close()


asyncio.run(check_copy_email())
print("PASS: copy-email button copies the address and confirms with a toast.")
