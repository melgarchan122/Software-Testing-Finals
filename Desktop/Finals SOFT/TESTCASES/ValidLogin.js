const { Builder, By } = require("selenium-webdriver");
require("chromedriver");

const BASE_URL = "http://localhost:5173";

async function validLoginTest() {
  const driver = await new Builder().forBrowser("chrome").build();

  console.log("\n========================================");
  console.log("TEST CASE: TC_Auten_001 - Valid Login");
  console.log("========================================\n");

  try {
    console.log("Step 1: Going to login page...");
    await driver.get(`${BASE_URL}/login`);
    await driver.sleep(2000);
    console.log("Login page loaded\n");

    console.log("Step 2: Entering email...");
    await driver
      .findElement(By.css('input[type="email"]'))
      .sendKeys("test@example.com");
    console.log("Email entered: test@example.com\n");

    console.log("Step 3: Entering password...");
    await driver
      .findElement(By.css('input[type="password"]'))
      .sendKeys("test123");
    console.log("Password entered: test123\n");

    console.log("Step 4: Clicking login...");
    await driver.findElement(By.css('button[type="submit"]')).click();
    await driver.sleep(3000);

    console.log("Step 5: Checking result...");
    const currentUrl = await driver.getCurrentUrl();

    if (!currentUrl.includes("login")) {
      console.log("\nTEST RESULT: PASSED - Login successful\n");
    } else {
      console.log("\nTEST RESULT: FAILED - Login failed\n");
    }
  } catch (error) {
    console.error("\nERROR:", error.message);
  } finally {
    await driver.quit();
  }
}

validLoginTest();
