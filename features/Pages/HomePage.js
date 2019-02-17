var PropertiesReader = require('properties-reader');
var or = PropertiesReader('./features/properties/or.properties');

module.exports = {

    elementsHomepage: {
        customerLoginButton: element(by.css(or.get('customerLoginBtn_CSS'))),
        bankManagerLoginButton: element(by.css(or.get('bankManagerLoginBtn_CSS'))),
    },

    goTocustomerLogin: function () {
        var element = this.elementsHomepage;
        return element.customerLoginButton.click();
    },

}