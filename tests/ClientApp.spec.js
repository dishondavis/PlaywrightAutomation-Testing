const { test, expect } = require("@playwright/test");
const { log } = require("console");

//E-commerce automation testing
test("Client App Login", async ({ page }) => {
  const email = 'dishonodavis@gmail.com'
  const password = 'IamKing@123'
  const productName = "ZARA COAT 3";
  const products = page.locator('div.card-body')
  const titles = await products.allTextContents()// retrieve all text contents
  const bool = page.locator("h3:has-text('ZARA COAT 3')").isVisible()

  // goes to website
  await page.goto("https://rahulshettyacademy.com/client")
  //fills in email
  await page.locator('#userEmail').fill(email);
  //fills in password
  await page.locator('#userPassword').fill(password)
  //clicks the login button
  await page.locator("[value='Login']").click()
  //await page.waitForLoadState('networkidle');// wait for the network come into idle mode. All network call being made.
  await products.first().waitFor();
  console.log(titles);
  // itterate through the products and adds it to cart
  const count = await products.count()
  for (let i = 0; i < count; i++) {
    if (await products.nth(i).locator('b').textContent() === productName) {
      // add to cart
      await products.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }
  // locates the cart button and clicks it
  await page.locator("[routerlink*='cart']").click();
  // wais for the website to load before proceeding
  page.locator("div li").first().waitFor()
  expect(bool).toBeTruthy();
  //checkouts the product
  await page.locator("text=Checkout").click()
  //fills and type in the country which is ind
  await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 100 });
  const dropDown = page.locator(".ta-results")
  // waits for dropdown to display
  await dropDown.waitFor()
  // itterates through the list of options in the dropdown to find and select India
  const optionsCount = await dropDown.locator("button").count()
  for (let i = 0; i < optionsCount; ++i) {
    const text = await dropDown.locator("button").nth(i).textContent();
    if (text === " India") {
      await dropDown.locator("button").nth(i).click();
      break;
    }
  }
  // aim for the child element with []. 
  await expect(page.locator(".user__name [type='text']").first()).toHaveText(email)
  // clicking the submit button
  await page.locator(".action__submit").click()
  // validating the order is confirmed
  await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
  // grabs the orderID and prints it in the console
  const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent()
  console.log(orderId);
});

//This tests extends the previous one by selecting your most recent order out of a list of orders and validating its the correct one.
test("Client App Login with OrderID Validation", async ({ page }) => {
  const email = 'dishonodavis@gmail.com'
  const password = 'IamKing@123'
  const productName = "ZARA COAT 3";
  const products = page.locator('div.card-body')
  const titles = await products.allTextContents()// retrieve all text contents
  const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent()
  const rows = await page.locator("tr th[scope='row']").all()



  await page.goto("https://rahulshettyacademy.com/client")
  await page.locator('#userEmail').fill(email);
  await page.locator('#userPassword').fill(password)
  await page.locator("[value='Login']").click()
  //await page.waitForLoadState('networkidle');// wait for the network come into idle mode. All network call being made.
  await products.first().waitFor();


  console.log(titles);
  const count = await products.count()
  for (let i = 0; i < count; i++) {
    if (await products.nth(i).locator('b').textContent() === productName) {
      // add to cart
      await products.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }
  // clicks on the cart to view the product selected
  await page.locator("[routerlink*='cart']").click();
  page.locator("div li").first().waitFor()
  // verifys the product is in the cart by ensuring its visibile
  const bool = page.locator("h3:has-text('ZARA COAT 3')").isVisible()
  expect(bool).toBeTruthy();
  // clicks on the checkout after verifying
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
  console.log(orderId);
  // Goes to the my orders page
  await page.locator("button[routerlink*='myorders']").click()
  // wait for the contents to load
  await page.locator('tbody').waitFor();
  // grabs the specific orderId from a row of orderIDs
  for (let i = 0; i < await rows.length; i++) {
    const rowOrderId = await rows[i].innerText()
    console.log(rowOrderId);
    if (orderId.includes(rowOrderId)) {
      //clicks on view button
      const viewButton = await page.locator("tr td button.btn-primary").nth(i);
      await viewButton.click();
      break;
    }

  }
  // validates orderID and if its identical the result is true
  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(orderId.includes(orderIdDetails)).toBeTruthy();


});