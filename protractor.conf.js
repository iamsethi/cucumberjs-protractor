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
    multiCapabilities: [
        {
            shardTestFiles: true,
            maxInstances: 1,
            sequential: true,
            browserName: 'chrome',
            specs: ['specs/Regression.js']
        },
        {
            shardTestFiles: true,
            maxInstances: 1,
            sequential: true,
            browserName: 'chrome',
            specs: ['specs/Smoke.js']
        }],
    plugins: [{
        package: require.resolve('protractor-multiple-cucumber-html-reporter-plugin'),
        options: {
            automaticallyGenerateReport: true,
            removeExistingJsonReportFile: true,
            reportName: 'CucumberJS Report',
            pageFooter: '<div><p>Created by SethiKetan</p></div>',
            pageTitle: 'CucumberJS with Protractor Report',
            customData: {
                title: 'Execution info',
                data: [

                    { label: 'Project', value: 'CucumberJS Project' },
                    { label: 'Release', value: '1.2.3' },
                    { label: 'Tester', value: 'Ketan Sethi' }

                ]


            },

            displayDuration: true
        }
    }],

    maxSessions: 2,

    specs: [properties.get('featuresPath')],

    cucumberOpts: {
        // require step definitions
        tags: false,
        format: 'json:.tmp/results.json',
        require: [
            properties.get('stepsPath') // accepts a glob
        ]
    }
};