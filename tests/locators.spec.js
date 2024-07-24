import { test, expect } from '@playwright/test'
//This test selects the Radio button, dropdown and check box.
test('Playwright Special Locators', async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/angularpractice/')
    await page.getByLabel("Check me out if you Love IceCreams!").click()
    await page.getByLabel("Employed").check()
    await page.getByLabel('Gender').selectOption('Female')

})
// This test doesn't use css locators but different methods such as Filters, getByPlaceholder and getRoleBy
test.only('Playwright Special Locators 2', async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/angularpractice/')
    await page.getByLabel("Check me out if you Love IceCreams!").click()
    await page.getByLabel("Employed").check()
    await page.getByLabel('Gender').selectOption('Female')
    await page.getByPlaceholder("Password").fill("123abc")
    await page.getByRole("button", { name: 'Submit' }).click()
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    await page.getByRole("link", { name: "Shop" }).click();
    await page.locator("app-card").filter({ hasText: "Nokia Edge" }).getByRole("button").click();
})