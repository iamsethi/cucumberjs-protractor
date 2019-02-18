var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('./features/properties/prop.properties');

exports.config = {
    seleniumAddress: properties.get('seleniumAddress'),
    //directConnect: true,
    getPageTimeout: properties.get('getPageTimeout'),
    allScriptsTimeout: properties.get('allScriptsTimeout'),
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    onPrepare: function () {
        browser.manage().window().maximize();
    },
    capabilities: {
        browserName: 'chrome',

        // allows different specs to run in parallel.
        // If this is set to be true, specs will be sharded by file
        // (i.e. all files to be run by this set of capabilities will run in parallel).
        // Default is false.
        shardTestFiles: true,

        // Maximum number of browser instances that can run in parallel for this
        // set of capabilities. This is only needed if shardTestFiles is true.
        // Default is 1.
        maxInstances: 5,
    },

    specs: [properties.get('featuresPath')],

    cucumberOpts: {
        // require step definitions
        tags: false,
        format: 'json:.tmp/results.json',
        require: [
            '../env.js',,
            properties.get('stepsPath') // accepts a glob
        ]
    }
};