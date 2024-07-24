const { test, expect } = require("@playwright/test");
const { log } = require("console");

//browswer is a fixture
test.only("Client App Login", async ({ page }) => {
  const email = 'dishonodavis@gmail.com'
  const password = 'IamKing@123'
  const productName = "ZARA COAT 3";
  const products = page.locator('div.card-body')
  await page.goto("https://rahulshettyacademy.com/client")
  await page.locator('#userEmail').fill(email);
  await page.locator('#userPassword').fill(password)
  await page.locator("[value='Login']").click()
  //await page.waitForLoadState('networkidle');// wait for the network come into idle mode. All network call being made.
  await products.first().waitFor();

  const titles = await products.allTextContents()// retrieve all text contents

  console.log(titles);
  const count = await products.count()
  for (let i = 0; i < count; i++) {
    if (await products.nth(i).locator('b').textContent() === productName) {
      // add to cart
      await products.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }
  await page.locator("[routerlink*='cart']").click();
  page.locator("div li").first().waitFor()
  //SUDO CLASS
  const bool = page.locator("h3:has-text('ZARA COAT 3')").isVisible()
  expect(bool).toBeTruthy();
  await page.locator("text=Checkout").click()
  await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 100 });
  const dropDown = page.locator(".ta-results")
  await dropDown.waitFor()
  const optionsCount = await dropDown.locator("button").count()
  for (let i = 0; i < optionsCount; ++i) {
    const text = await dropDown.locator("button").nth(i).textContent();
    if (text === " India") {
      await dropDown.locator("button").nth(i).click();
      break;
    }
  }
  // aim for the child element with []
  await expect(page.locator(".user__name [type='text']").first()).toHaveText(email)
  await page.locator(".action__submit").click()

  await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

  const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent()
  console.log(orderId);
});

//Selecting your most recent order out of a list of orders and validating its the correct one.
test.only("Client App Login", async ({ page }) => {
  const email = 'dishonodavis@gmail.com'
  const password = 'IamKing@123'
  const productName = "ZARA COAT 3";
  const products = page.locator('div.card-body')
  await page.goto("https://rahulshettyacademy.com/client")
  await page.locator('#userEmail').fill(email);
  await page.locator('#userPassword').fill(password)
  await page.locator("[value='Login']").click()
  //await page.waitForLoadState('networkidle');// wait for the network come into idle mode. All network call being made.
  await products.first().waitFor();

  const titles = await products.allTextContents()// retrieve all text contents

  console.log(titles);
  const count = await products.count()
  for (let i = 0; i < count; i++) {
    if (await products.nth(i).locator('b').textContent() === productName) {
      // add to cart
      await products.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }
  await page.locator("[routerlink*='cart']").click();
  page.locator("div li").first().waitFor()
  //SUDO CLASS
  const bool = page.locator("h3:has-text('ZARA COAT 3')").isVisible()
  expect(bool).toBeTruthy();
  await page.locator("text=Checkout").click()
  await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 100 });
  const dropDown = page.locator(".ta-results")
  await dropDown.waitFor()
  const optionsCount = await dropDown.locator("button").count()
  for (let i = 0; i < optionsCount; ++i) {
    const text = await dropDown.locator("button").nth(i).textContent();
    if (text === " India") {
      await dropDown.locator("button").nth(i).click();
      break;
    }
  }
  // aim for the child element with []
  await expect(page.locator(".user__name [type='text']").first()).toHaveText(email)
  await page.locator(".action__submit").click()

  await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

  const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent()
  console.log(orderId);
  await page.locator("button[routerlink*='myorders']").click()
  await page.locator('tbody').waitFor();
  const rows = await page.locator("tr th[scope='row']").all()

  for (let i = 0; i < await rows.length; i++) {
    const rowOrderId = await rows[i].innerText()
    console.log(rowOrderId);
    if (orderId.includes(rowOrderId)) {
      // await rows.nth(i).locator('button').first().click()
      // break;
      const viewButton = await page.locator("tr td button.btn-primary").nth(i);
      await viewButton.click();
      break;
    }

  }

  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(orderId.includes(orderIdDetails)).toBeTruthy();


});