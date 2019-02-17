module.exports = {

    go: function (site) {
        return browser.get(site);
    },

    getTitle: function () {
        return browser.getTitle();
    }

}