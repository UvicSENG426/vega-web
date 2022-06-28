const {Builder, By} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function openChromeTest() {
  try {
    let options = new chrome.Options();
    let driver = await new Builder()
                .setChromeOptions(options)
                .forBrowser('chrome')
                .build();
    await driver.get('localhost:3000');
    let title = await driver.findElement(By.id("root"));
    //let title = await driver.findElement(By.xpath("//input[@type='submit']"));
    console.log(title);
    await driver.quit();
  } catch (error) {
    console.log(error)
  }
})();