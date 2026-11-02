"""Run with python3 tests/accessibility_announcements.py against the preview."""
import asyncio
from playwright.async_api import async_playwright


async def check_announcements():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1280, "height": 1800})
        await page.goto("http://localhost:8080", wait_until="networkidle")
        status = page.locator('[role="status"][aria-live="polite"][aria-atomic="true"]')
        await page.get_by_role("button", name="Open accessibility settings", exact=True).click()
        panel = page.get_by_role("dialog", name="Accessibility", exact=True)
        assert await status.inner_text() == "", "Opening settings must not announce preferences"
        await page.evaluate("""() => {
            window.settingAnnouncements = [];
            const region = document.querySelector('[role="status"][aria-live="polite"]');
            new MutationObserver(() => window.settingAnnouncements.push(region.textContent))
                .observe(region, {childList: true, characterData: true, subtree: true});
        }""")

        async def change(name, expected):
            button = panel.get_by_role("button", name=name, exact=True)
            await button.focus()
            await button.press("Enter")
            await page.wait_for_timeout(400)
            assert await status.inner_text() == expected
            assert await button.evaluate("el => document.activeElement === el"), "Announcement moved focus"

        await change("Increase font size", "Font size 112.5%.")
        await change("Dark mode", "Dark mode on.")
        await change("High contrast", "High contrast on.")
        await change("Reset to defaults", "Accessibility settings reset to defaults.")
        count = await page.evaluate("window.settingAnnouncements.length")
        await panel.get_by_role("button", name="Reset to defaults").press("Enter")
        await page.wait_for_timeout(400)
        assert await page.evaluate("window.settingAnnouncements.length") == count, "No-op reset repeated an announcement"

        # A quick on/off/on sequence must produce only the final confirmation.
        toggle = panel.get_by_role("button", name="Dark mode", exact=True)
        await toggle.focus()
        for _ in range(3):
            await toggle.press("Enter")
        await page.wait_for_timeout(400)
        assert await page.evaluate("window.settingAnnouncements.length") == count + 1
        assert await status.inner_text() == "Dark mode on."
        await page.keyboard.press("Escape")
        await page.get_by_role("button", name="Open accessibility settings — custom settings active").click()
        await page.wait_for_timeout(400)
        assert await page.evaluate("window.settingAnnouncements.length") == count + 1
        await page.reload(wait_until="networkidle")
        assert await status.inner_text() == "", "Saved settings must restore silently"
        assert await page.locator("html").evaluate("el => el.classList.contains('dark')")
        await browser.close()


asyncio.run(check_announcements())
print("PASS: polite confirmations, stable focus, rapid-change coalescing, silent reopening and restoration.")