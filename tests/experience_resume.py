"""Run with python3 tests/experience_resume.py against the running preview."""
import asyncio
from urllib.parse import urljoin
from playwright.async_api import async_playwright


async def check_resume_facts():
    async with async_playwright() as playwright:
        browser = await playwright.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1280, "height": 1800})
        await page.goto("http://localhost:8080/experience", wait_until="networkidle")
        ringtail = page.get_by_role("article").filter(has_text="Ringtail Interactive")
        assert "Jan 2023 – Jan 2025" in await ringtail.inner_text()
        assert "90%" in await ringtail.inner_text()
        studio = page.get_by_role("article").filter(has_text="Studio 14")
        assert "from 52% to 98%" in await studio.inner_text()
        assert "28%" in await studio.inner_text()
        leo = page.get_by_role("article").filter(has_text="LeoVegas")
        assert "Nov 2025 – Feb 2026" in await leo.inner_text()
        assert "Canadian markets" in await leo.inner_text()
        assert "80%" in await leo.inner_text()
        everyfarmer = page.get_by_role("article").filter(has_text="EveryFarmer")
        assert "100,000+" in await everyfarmer.inner_text()
        assert "$10,000" in await everyfarmer.inner_text()
        assert "80%" in await everyfarmer.inner_text()
        education = page.get_by_role("region", name="Education")
        assert "Stockholm University" in await education.inner_text()
        assert "2023–2026" in await education.inner_text()
        assert "University of Lagos" in await education.inner_text()
        assert "2012–2015" in await education.inner_text()
        download = page.get_by_role("link", name="Download résumé (PDF)")
        url = await download.get_attribute("href")
        assert url and "/__l5e/assets-v1/" in url
        response = await page.request.get(urljoin(page.url, url))
        assert response.ok
        assert (await response.body()).startswith(b"%PDF")
        await browser.close()


asyncio.run(check_resume_facts())
print("PASS: new resume dates, metrics, education and downloadable PDF.")