module.exports = {
    go: (site) => {
        return browser.get(site);
    },

    getTitle: () => {
        return browser.getTitle();
    },
};