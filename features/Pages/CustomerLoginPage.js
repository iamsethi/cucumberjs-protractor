var PropertiesReader = require('properties-reader');
var or = PropertiesReader('./features/properties/or.properties');

module.exports = {

    elementsCustomerLoginPage: {
        nameDropDown: element(by.model(or.get('customerId_model'))).$(or.get('nameDropdown_CSS')),
        loginButton: element(by.xpath(or.get('loginBtn_xpath'))),
    },

    selectCustomer: function () {
        var element = this.elementsCustomerLoginPage;
        return element.nameDropDown.click();
    },

    
    doLogin: function () {
        var element = this.elementsCustomerLoginPage;
        return element.loginButton.click();
    }

}