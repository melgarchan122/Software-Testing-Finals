const { Builder, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
require("chromedriver");

const BASE_URL = "http://localhost:5173";

async function viewProductDetailsTest() {
  const options = new chrome.Options();
  options.addArguments("--disable-notifications");
  options.addArguments("--disable-gpu");

  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  console.log("\n========================================");
  console.log("TEST CASE: TC_Prod_002 - View Product Details");
  console.log("========================================\n");

  try {
    console.log("Step 1: Going to home page...");
    await driver.get(BASE_URL);
    await driver.sleep(2000);

    console.log("Step 2: Clicking Shop Now or going to /home...");
    try {
      const shopNow = await driver.findElement(
        By.xpath("//*[contains(text(), 'Shop Now')]"),
      );
      await shopNow.click();
      await driver.sleep(2000);
      console.log("Clicked Shop Now");
    } catch (e) {
      console.log("Shop Now not found, going to /home directly");
      await driver.get(`${BASE_URL}/home`);
      await driver.sleep(2000);
    }

    console.log("Step 3: Looking for products...");
    const products = await driver.findElements(
      By.css('.product-card, [class*="product"], [class*="card"]'),
    );
    console.log("Products found:", products.length);

    if (products.length > 0) {
      const productName = await products[0]
        .findElement(By.css("h3, .product-name"))
        .getText();
      console.log("First product:", productName);

      console.log("Step 4: Clicking product...");
      await products[0].click();
      await driver.sleep(3000);

      const currentUrl = await driver.getCurrentUrl();
      console.log("URL after click:", currentUrl);

      if (currentUrl.includes("product")) {
        console.log("\nTEST RESULT: PASSED - Product details loaded");
      } else {
        console.log("\nTEST RESULT: FAILED - Not on product details page");
      }
    } else {
      console.log("\nTEST RESULT: FAILED - No products found");
    }
  } catch (error) {
    console.error("\nERROR:", error.message);
  } finally {
    await driver.quit();
  }
}

viewProductDetailsTest();
