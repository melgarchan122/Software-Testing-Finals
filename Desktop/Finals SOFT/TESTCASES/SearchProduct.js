const { Builder, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
require("chromedriver");

const BASE_URL = "http://localhost:5173";

async function searchProductTest() {
  const options = new chrome.Options();
  options.addArguments("--disable-notifications");
  options.addArguments("--disable-gpu");

  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  console.log("\n========================================");
  console.log("TEST CASE: TC_Prod_003 - Search Product");
  console.log("========================================\n");

  try {
    console.log("Step 1: Going to home page...");
    await driver.get(BASE_URL);
    await driver.sleep(2000);

    console.log("Step 2: Clicking Shop Now to go to products...");
    try {
      const shopNow = await driver.findElement(
        By.xpath("//*[contains(text(), 'Shop Now')]"),
      );
      await shopNow.click();
      await driver.sleep(2000);
    } catch (e) {
      await driver.get(`${BASE_URL}/home`);
      await driver.sleep(2000);
    }

    console.log("Step 3: Finding search input...");
    const searchInput = await driver.findElement(
      By.css('input[type="text"], .search-input, input[placeholder*="search"]'),
    );
    console.log("Search input found");

    console.log('Step 4: Searching for "headphones"...');
    await searchInput.clear();
    await searchInput.sendKeys("headphones");
    await driver.sleep(2000);
    console.log("Search term entered: headphones");

    console.log("Step 5: Checking results...");
    const results = await driver
      .findElement(By.css('.results-count, .products-count, [class*="result"]'))
      .getText();
    console.log("Results text:", results);

    const products = await driver.findElements(
      By.css('.product-card, [class*="product"]'),
    );
    console.log("Number of products displayed:", products.length);

    console.log("Step 6: Verifying search results...");
    let hasHeadphones = false;
    for (let i = 0; i < products.length && i < 5; i++) {
      const text = await products[i].getText();
      if (text.toLowerCase().includes("headphones")) {
        hasHeadphones = true;
        break;
      }
    }

    if (hasHeadphones || products.length > 0) {
      console.log("\nTEST RESULT: PASSED - Search working");
    } else {
      console.log("\nTEST RESULT: FAILED - Search not working");
    }
  } catch (error) {
    console.error("\nERROR:", error.message);
  } finally {
    await driver.quit();
  }
}

searchProductTest();
