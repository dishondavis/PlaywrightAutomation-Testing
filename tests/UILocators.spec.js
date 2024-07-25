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
    // goes to website
    await page.goto('https://rahulshettyacademy.com/angularpractice/')
    // find and clicks on the label 
    await page.getByLabel("Check me out if you Love IceCreams!").click()
    // checks the check box
    await page.getByLabel("Employed").check()
    // selects the Female Gender from the dropdown between Male and Female
    await page.getByLabel('Gender').selectOption('Female')
    //Uses the placeholder to fill in the password
    await page.getByPlaceholder("Password").fill("123abc")
    //Locate the submit button and clicks it
    await page.getByRole("button", { name: 'Submit' }).click()
    // Uses the visibility method to confirm the text pops up after clicking submit button  
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    //Clicks the shop button on the top right
    await page.getByRole("link", { name: "Shop" }).click();
    //Filter through a list of products and clicks the Nokie Edge
    await page.locator("app-card").filter({ hasText: "Nokia Edge" }).getByRole("button").click();
})