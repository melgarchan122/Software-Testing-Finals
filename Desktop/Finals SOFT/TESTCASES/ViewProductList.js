const { Builder, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
require("chromedriver");

const BASE_URL = "http://localhost:5173";

async function viewProductListTest() {
  const options = new chrome.Options();
  options.addArguments("--disable-notifications");
  options.addArguments("--disable-gpu");

  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  console.log("\n========================================");
  console.log("TEST CASE: TC_Prod_001 - View Product List");
  console.log("========================================\n");

  try {
    console.log("Step 1: Going to home page...");
    await driver.get(BASE_URL);
    await driver.sleep(3000);
    console.log("Home page loaded\n");

    console.log("Step 2: Finding all div elements...");
    const divs = await driver.findElements(By.css("div"));
    console.log("Total divs found:", divs.length);

    console.log("Step 3: Looking for divs with class...");
    let productDivs = [];
    for (let i = 0; i < divs.length; i++) {
      const className = await divs[i].getAttribute("class");
      if (
        className &&
        (className.includes("product") ||
          className.includes("Product") ||
          className.includes("card"))
      ) {
        productDivs.push(className);
        console.log("Found class:", className);
      }
    }

    if (productDivs.length > 0) {
      console.log("\nStep 4: Using first found class...");
      const productElements = await driver.findElements(
        By.css(`.${productDivs[0].split(" ")[0]}`),
      );
      console.log("Products found with class:", productDivs[0].split(" ")[0]);
      console.log("Number of products:", productElements.length);
      console.log("\nTEST RESULT: PASSED - Product list loaded");
    } else {
      console.log("\nNo product-related classes found");
      console.log("TEST RESULT: FAILED - No products found");
    }
  } catch (error) {
    console.error("\nERROR:", error.message);
  } finally {
    await driver.quit();
  }
}

viewProductListTest();
