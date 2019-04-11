var logger = require(process.cwd() + "/support/log");
var SelectWrapper = require(process.cwd() + "/support/select-wrapper");
var { Given, When, Then, After } = require('cucumber');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var PropertiesReader = require('properties-reader');
var or = PropertiesReader('./features/properties/or.properties');

chai.use(chaiAsPromised);
var expect = chai.expect;

After(function (scenarioResult) {
  let self = this;

  if (scenarioResult.result.status === 'failed') {
    return browser.takeScreenshot()
      .then(function (screenshot) {
        const decodedImage = new Buffer(screenshot.replace(/^data:image\/png;base64,/, ''), 'base64');
        self.attach(decodedImage, 'image/png');
        console.log("scenarioResult  = ", scenarioResult.result.status);
      });
  }
});

var base = require('../Pages/BasePage.js')
Given(/^I go to "([^"]*)"$/, function (site) {
  return base.go(site).then(function () {
    logger.log('info', 'Navigated to site successfully')
  });  //return browser.get(site);
});

When(/^I found the title as "([^"]*)"$/, function (title) {
  var actualTitle = base.getTitle().then(function (actualTitle) {
    logger.log('info', 'Actual Title - ' + actualTitle + 'and Expected Title - ' + title)
    return actualTitle
  });  // browser.getTitle();
  return expect(actualTitle).to.eventually.equal(title);
});

var homepage = require('../Pages/HomePage.js')
When('I click on customer login button', function () {
  return homepage.goTocustomerLogin();
});

var customer = require('../Pages/CustomerLoginPage.js')
When('I select the value as {string}', function (string) {
  return customer.selectCustomer();
});


When('I click on login', function () {
  return customer.doLogin();
});

var transaction = require('../Pages/TransactionsPage.js')
Then('I should be able to see login as {string}', function (string) {
  return expect(transaction.getCustomerText()).to.eventually.equal(string);
});

Then('I should be able to select the customer as {string}', function (string) {

  var mySelect = new SelectWrapper(by.id("userSelect"));
  mySelect.selectByText(string);
  return mySelect.selectByValue("3");
});