const { Builder, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
require("chromedriver");

const BASE_URL = "http://localhost:5173";

async function logoutTest() {
  const options = new chrome.Options();
  options.addArguments("--disable-notifications");
  options.addArguments("--disable-gpu");

  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  console.log("\n========================================");
  console.log("TEST CASE: TC_Auten_004 - Logout");
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
    console.log("Email entered\n");

    console.log("Step 3: Entering password...");
    await driver
      .findElement(By.css('input[type="password"]'))
      .sendKeys("test123");
    console.log("Password entered\n");

    console.log("Step 4: Clicking login...");
    await driver.findElement(By.css('button[type="submit"]')).click();
    await driver.sleep(3000);
    console.log("Logged in successfully\n");

    console.log("Step 5: Getting URL before logout...");
    const beforeUrl = await driver.getCurrentUrl();
    console.log("URL before logout:", beforeUrl);

    console.log("Step 6: Clicking logout button...");
    const logoutBtn = await driver.findElement(
      By.xpath("//button[contains(text(), 'Logout')]"),
    );
    await logoutBtn.click();
    await driver.sleep(3000);
    console.log("Logout button clicked\n");

    console.log("Step 7: Getting URL after logout...");
    const afterUrl = await driver.getCurrentUrl();
    console.log("URL after logout:", afterUrl);

    console.log("Step 8: Checking result...");
    if (
      afterUrl.includes("login") ||
      afterUrl.includes("signup") ||
      afterUrl === BASE_URL ||
      afterUrl === `${BASE_URL}/`
    ) {
      console.log("\nTEST RESULT: PASSED - Logout successful\n");
    } else {
      console.log(
        "\nTEST RESULT: FAILED - Logout failed - Still on:",
        afterUrl,
      );
    }
  } catch (error) {
    console.error("\nERROR:", error.message);
  } finally {
    await driver.quit();
  }
}

logoutTest();
