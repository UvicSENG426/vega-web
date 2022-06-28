const webdriver = require('selenium-webdriver');
const assert = require('assert');
const { writeSync } = require('fs');

const ADMIN_USERNAME = 'admin@venus.com';
const ADMIN_PASSWORD = 'pass';
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

//Selenium test for logging in admin user
describe('Login/Logout', () => {
    let driver;
    before(async () => {
        driver = new webdriver.Builder().forBrowser('chrome')
            .build();

        await driver.get(`http://localhost:3000`);
    }, 30000);

    after(async () => {
        await driver.quit();
    }, 40000);

    it('Admin Login', async () => {
        //login button 
        await driver.findElement(webdriver.By.linkText('Login/SignUp')).click()
        //username
        await driver.findElement(webdriver.By.xpath('//*[@id="root"]/div/div[2]/div/div/form/div[1]/input')).sendKeys(ADMIN_USERNAME)
        //password
        await driver.findElement(webdriver.By.xpath('//*[@id="root"]/div/div[2]/div/div/form/div[2]/input')).sendKeys(ADMIN_PASSWORD)
        //submit button
        await driver.findElement(webdriver.By.xpath('//*[@id="root"]/div/div[2]/div/div/form/button')).click()        
        //Verify admin portal visible
        assert.notEqual(driver.findElements(webdriver.By.name('Admin')).length, 0)
        
    }, 35000);

    it('Admin Logout', async () => {
        await driver.get(`http://localhost:3000`)
        //LOGOUT
        await driver.findElement(webdriver.By.xpath('//*[@id="root"]/div/div[1]/div[1]/nav[2]/div/div/div/a')).click()
        //click signout
        await driver.get(`http://localhost:3000/account`)
        await driver.findElement(webdriver.By.xpath('//*[@id="root"]/div/div[1]/div[2]/div/div/button')).click()
        //Verify Login/SignUp page shown
        assert.notEqual(driver.findElements(webdriver.By.linkText('Login/SignUp')).length, 0)
        
    }, 35000);
});

