const { test, expect } = require("@playwright/test")

test("Calendar validations", async ({ page }) => {
    const monthNumber = '7'
    const date = "15"
    const year = "2027"
    // go to website
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers")
    //clicks the date picker on the calender
    await page.locator(".react-date-picker__inputGroup").click()
    //inside the date picker, clicks the top to choose the year
    await page.locator(".react-calendar__navigation__label").click()
    await page.locator(".react-calendar__navigation__label").click()
    // clicks the year 2027
    await page.getByText(year).click()
    //clicks the month which is June
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber) - 1).click()
    // clicks the 15th on the calendar
    await page.locator("//abbr[text()='" + date + "']").click()
})