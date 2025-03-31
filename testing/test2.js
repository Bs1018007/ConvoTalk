import { Builder, By, Key, until } from "selenium-webdriver";

async function testLogin() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("http://localhost:5173/login"); 

    await driver.wait(until.elementLocated(By.css("input[placeholder='you@example.com']")), 5000);

    await driver.findElement(By.css("input[placeholder='you@example.com']")).sendKeys("User7@example.com222");
    await driver.findElement(By.css("input[type='password']")).sendKeys("test1123441443", Key.RETURN);

    const w = await driver.wait(until.urlContains("/"), 5000);

    if (w){
      console.log(" Login Test Passed!");
      await driver.sleep(10000);
    }
  } catch (error) {
    console.error(" Login Test Failed:", error);
  } finally {
    await driver.quit();
  }
}

testLogin();
