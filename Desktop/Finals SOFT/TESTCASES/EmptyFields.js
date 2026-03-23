const { Builder, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
require("chromedriver");

const BASE_URL = "http://localhost:5173";

async function emptyFieldsTest() {
  const options = new chrome.Options();
  options.addArguments("--disable-notifications");
  options.addArguments("--disable-gpu");

  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  console.log("\n========================================");
  console.log("TEST CASE: TC_Auten_003 - Empty Fields");
  console.log("========================================\n");

  try {
    console.log("Step 1: Going to login page...");
    await driver.get(`${BASE_URL}/login`);
    await driver.sleep(2000);
    console.log("Login page loaded\n");

    console.log("Step 2: Leaving email field empty...");
    console.log("Email field empty\n");

    console.log("Step 3: Leaving password field empty...");
    console.log("Password field empty\n");

    console.log("Step 4: Clicking login...");
    await driver.findElement(By.css('button[type="submit"]')).click();
    await driver.sleep(2000);

    console.log("Step 5: Checking result...");
    const currentUrl = await driver.getCurrentUrl();

    if (currentUrl.includes("login")) {
      console.log(
        "\nTEST RESULT: PASSED - Login prevented with empty fields\n",
      );
    } else {
      console.log(
        "\nTEST RESULT: FAILED - Login proceeded with empty fields\n",
      );
    }
  } catch (error) {
    console.error("\nERROR:", error.message);
  } finally {
    await driver.quit();
  }
}

emptyFieldsTest();
