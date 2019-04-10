module.exports = {

    elementsCustomerLoginPage: {
        nameDropDown: element(by.model('custId')).$("[value = '2']"),
        loginButton: element(by.xpath("//button[@type='submit']")),
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
