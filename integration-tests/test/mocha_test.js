const webdriver = require('selenium-webdriver');
const assert = require('assert');

//Example selenium test with mocha assertions
describe('webdriver', () => {
    let driver;
    before(async () => {
        driver = new webdriver.Builder().forBrowser('chrome')
            .build();

        await driver.get(`http://localhost:3000`);
    }, 30000);

    after(async () => {
        await driver.quit();
    }, 40000);

    it('test load Platform page', async () => {


        await driver.findElement(webdriver.By.linkText('Platform')).click()

        const title = await driver.getTitle()
        console.log(title)
        assert.equal(title, "React App")
    }, 35000);
});