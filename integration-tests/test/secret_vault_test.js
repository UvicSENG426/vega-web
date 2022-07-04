const webdriver = require('selenium-webdriver');
const assert = require('assert');
const { writeSync } = require('fs');
const STAFF_USERNAME = 'jonoliver@venus.com';
const STAFF_PASSWORD = 'pass';
//Selenium test for logging in admin user
describe('Secret Vault', () => {
  let driver;
  before(async () => {
      driver = new webdriver.Builder().forBrowser('chrome')
          .build();

      await driver.get(`http://localhost:3000`);
  }, 30000);

  after(async () => {
      await driver.quit();
  }, 40000);

  it('Verify Secrets Not Visible When Logged out', async () => {
      //Verify Logged out
      if(driver.findElements(webdriver.By.name('Logout')).length != 0){
        //logout
        //click signout
        await driver.get(`http://localhost:3000/account`)
        await driver.findElement(webdriver.By.xpath('//*[@id="root"]/div/div[1]/div[2]/div/div/button')).click()
        //Verify Login/SignUp page shown
        assert.notEqual(driver.findElements(webdriver.By.linkText('Login/SignUp')).length, 0)
      }

      assert.equal(driver.findElements(webdriver.By.name('Manage Secrets')).length, 0, "Manage Secrets Page Visible while Logged out")
      
  }, 35000);
  it('Add new Secret', async () => {
    //Login User
     await driver.findElement(webdriver.By.linkText('Login/SignUp')).click()
     //username
     await driver.findElement(webdriver.By.xpath('//*[@id="root"]/div/div[2]/div/div/form/div[1]/input')).sendKeys(STAFF_USERNAME)
     //password
     await driver.findElement(webdriver.By.xpath('//*[@id="root"]/div/div[2]/div/div/form/div[2]/input')).sendKeys(STAFF_PASSWORD)
     //submit button
     await driver.findElement(webdriver.By.xpath('//*[@id="root"]/div/div[2]/div/div/form/button')).click()

    //Go to manage Secrets Page
    await driver.findElements(webdriver.By.name('Manage Secrets')).click()
    await driver.findElement(webdriver.By.xpath('//*[@id="root"]/div/div[1]/div[2]/table/thead/tr[1]/td[5]/button')).click() // click add secret
    await driver.findElement(webdriver.By.xpath('//*[@id="root"]/div/div[1]/div[2]/table/thead/tr[3]/td[1]')).sendKeys("TEST") // Add secret value
    await driver.findElement(webdriver.By.xpath('//*[@id="root"]/div/div[1]/div[2]/table/thead/tr[3]/td[5]/button')).click() //Click submit
    assert.notEqual(driver.findElements(webdriver.By.name('TEST')).length, 0, "Created secret not visible")
    
}, 35000);
it('Modify Secret', async function() {
    await driver.get("http://localhost:3000/")
    await driver.manage().window().setRect({ width: 1720, height: 934 })
    await driver.findElement(By.linkText("Login/SignUp")).click()
    await driver.findElement(By.css(".mb-3:nth-child(1) > .form-control")).sendKeys("admin@venus.com")
    await driver.findElement(By.css(".mb-3:nth-child(2) > .form-control")).sendKeys("pass")
    await driver.findElement(By.css(".btn")).click()
    await driver.findElement(By.linkText("Manage Secrets")).click()
    await driver.close()
  })

  it('Delete Secret', async function() {
    await driver.get("http://localhost:3000/")
    await driver.manage().window().setRect({ width: 1720, height: 934 })
    await driver.findElement(By.linkText("Manage Secrets")).click()
    await driver.switchTo().frame(0)
    await driver.findElement(By.css("body")).click()
    await driver.findElement(By.css("body")).click()
    await driver.findElement(By.css("body")).click()
    await driver.findElement(By.css("body")).click()
    {
      const element = await driver.findElement(By.css("body"))
      await driver.actions({ bridge: true}).doubleClick(element).perform()
    }
    await driver.close()
  })

  it('Share Secret', async function() {
    this.skip("Share Secrets Not Yet Implemented")
  })
  
});