const { Builder, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
require("chromedriver");

const BASE_URL = "http://localhost:5173";

async function invalidLoginTest() {
  const options = new chrome.Options();
  options.addArguments("--disable-notifications");
  options.addArguments("--disable-gpu");

  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  console.log("\n========================================");
  console.log("TEST CASE: TC_Auten_002 - Invalid Login");
  console.log("========================================\n");

  try {
    console.log("Step 1: Going to login page...");
    await driver.get(`${BASE_URL}/login`);
    await driver.sleep(2000);
    console.log("Login page loaded\n");

    console.log("Step 2: Entering wrong email...");
    await driver
      .findElement(By.css('input[type="email"]'))
      .sendKeys("wrong@email.com");
    console.log("Wrong email entered: wrong@email.com\n");

    console.log("Step 3: Entering wrong password...");
    await driver
      .findElement(By.css('input[type="password"]'))
      .sendKeys("wrongpassword");
    console.log("Wrong password entered\n");

    console.log("Step 4: Clicking login...");
    await driver.findElement(By.css('button[type="submit"]')).click();
    await driver.sleep(3000);

    console.log("Step 5: Checking result...");
    const currentUrl = await driver.getCurrentUrl();

    if (currentUrl.includes("login")) {
      console.log("\nTEST RESULT: PASSED - Invalid login correctly rejected\n");
    } else {
      console.log("\nTEST RESULT: FAILED - Invalid login was accepted\n");
    }
  } catch (error) {
    console.error("\nERROR:", error.message);
  } finally {
    await driver.quit();
  }
}

invalidLoginTest();
