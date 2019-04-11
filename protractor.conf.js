var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('./features/properties/prop.properties');

exports.config = {
    // seleniumAddress: properties.get('seleniumAddress'),
    directConnect: true,
    getPageTimeout: properties.get('getPageTimeout'),
    allScriptsTimeout: properties.get('allScriptsTimeout'),
    capabilities: {
        browserName: process.env.TEST_BROWSER_NAME || "chrome"
    },

    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    specs: [properties.get('featuresPath')],

    onPrepare: function () {
        browser.manage().window().maximize();
    },

    plugins: [{
        package: require.resolve('protractor-multiple-cucumber-html-reporter-plugin'),
        options: {
            automaticallyGenerateReport: true,
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


    cucumberOpts: {
        strict: true,
        format: 'json:./reports/json/cucumber_report.json',
        tags: "(@regression or @smoke) and (not @DatabaseTest)", // @DatabaseTest scenario can be included when the username & password of DB have been configured in Support/database.js
        require: [
            '../env.js', '../support/*.js',
            properties.get('stepsPath')
        ]
    },

    onComplete: function () {
        console.log("Sending Mail with reports for the test execution.");
        var sys = require('util')
        var exec = require('child_process').exec;
        function puts(error, stdout, stderr) { sys.puts(stdout) }
        exec("node ./support/mail.js", puts);
    }


};