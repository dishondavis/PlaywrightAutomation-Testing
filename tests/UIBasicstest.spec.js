const { test, expect } = require("@playwright/test");
const { log } = require("console");

// browswer is a fixture
test("Browser Playwright test", async ({ browser }) => {
  //chrome - plugins
  const context = await browser.newContext();
  const page = await context.newPage();
  const userName = page.locator("#username");
  const signIn = page.locator("#signInBtn");
  const cardTitles = page.locator('.card-body a')

  // goes to webiste
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());
  //css
  //types username
  await userName.fill("rahulshetty");
  // type password
  await page.locator("[type='password']").fill("learning");
  await signIn.click();
  console.log(await page.locator("[style*='block']").textContent());
  await expect(page.locator("[style*='block']")).toContainText("Incorrect");
  //type - fill
  await userName.fill("");
  await userName.fill("rahulshettyacademy");
  //race condition
  await Promise.all(
    [
      page.waitForNavigation(),
      signIn.click()
    ]
  );
  await signIn.click();
  console.log(await cardTitles.first().textContent());
  console.log(await cardTitles.nth(1).textContent());
  const allTitles = await cardTitles.allTextContents()
  console.log(allTitles);
});


// test("Page Playwright test", async ({ page }) => {
//   await page.goto("https://google.com");
//   // get title - assertion
//   console.log(await page.title());
//   await expect(page).toHaveTitle("Google");
// });


test('UI Controls', async ({ page }) => {

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const userName = page.locator("#username");
  const signIn = page.locator("#signInBtn");
  const dropdown = page.locator('select.form-control')
  const documentLink = page.locator("[href*='documents-request']");
  await dropdown.selectOption('consult') //this method sends the value of the options.
  const text = await newPage.locator('.red').textContent();
  const arrayText = text.split('@')
  const domain = arrayText[1].split(' ')[0]

  await page.locator('.radiotextsty').last().click();
  await page.locator('#okayBtn').click();
  console.log(await page.locator('.radiotextsty').last().isChecked());
  await expect(page.locator('.radiotextsty').last()).toBeChecked(); //make sure this radio button is to be checked or it will fail
  await page.locator('#terms').click();
  await expect(page.locator('#terms')).toBeChecked();
  await page.locator('#terms').uncheck();
  await expect(page.locator('#terms')).not.toBeChecked()
  await expect(documentLink).toHaveAttribute("class", "blinkingText")
  //assertion
  //await page.pause();
})

test('Child windows handling', async ({ browser }) => {
  const context = await browser.newContext()
  const page = await context.newPage()
  const userName = page.locator("#username");
  const documentLink = page.locator("[href*='documents-request']");

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  const [newPage] = await Promise.all([
    context.waitForEvent('page'), // listen for any new page to open
    // 3 status of promises: pending, rejected and fulfilled
    documentLink.click() // new page is opened

  ])
  console.log(domain);
  await page.locator('#username').fill(domain);
  //await page.pause();
  console.log(await page.locator(userName).textContent);
})