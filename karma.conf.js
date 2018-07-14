/*
 * More detailed explanation here: http://karma-runner.github.io/0.13/config/configuration-file.html
 */
process.env.CHROME_BIN = require('puppeteer').executablePath();
var webpackKarmaConfig = require('./webpack.test.ts');
var path = require('path');

module.exports = function (config) {
    config.set({
        /*
         * Enable or disable watching files and executing the tests whenever
         * one of the files in the "files" field is changed.
         */
        autoWatch: true,

        /*
         * The root path location that will be used to resolve all relative
         * paths defined in "files" and "exclude".
         */
        basePath: "",

        /*
         * List of browsers to launch and capture tests in. In order to use a
         * specified browser, you must npm install the corresponding
         * karma-***-launcher.
         * http://karma-runner.github.io/0.13/config/browsers.html
         */
        // browsers: ['Chrome'],
        browsers: ['ChromeHeadless'],
        browserDisconnectTimeout: 10000,
        processKillTimeout: 10000,

        // Enable or disable colors in the output (reporters and logs)
        colors: true,

        // List of files/patterns to exclude from loaded files
        exclude: [],

        /*
         * The files array determines which files are included in the browser
         * and which files are watched and served by Karma. The order of patterns
         * determines the order in which files are included in the browser.
         * http://karma-runner.github.io/0.13/config/files.html
         */
        files: [
            './node_modules/es6-shim/es6-shim.js',
            'tests.webpack.ts'
        ],

        /*
         * List of test frameworks you want to use. For example, if you want to
         * use mocha, chai, and sinon, you'll need to npm install their
         * corresponding karma-*** modules and include them in the list of plugins
         * as well as below.
         */
        frameworks: ["mocha", "chai", "sinon", "karma-typescript", 'source-map-support'],

        logLevel: config.LOG_INFO,//config.LOG_DISABLE

        /*
         * By default, Karma loads all sibling NPM modules which have a name
         * starting with karma-*. You can also explicitly list plugins you want
         * to load via the plugins configuration setting.
         */
        plugins: [
            "karma-*"
        ],

        // The port where the Karma web server will be listening.
        port: 9876,

        /*
         * A map of preprocessors to use. Requires the corresponding karma-*
         * npm module to be npm installed and added to the "plugins" field.
         */
        preprocessors: {
            'tests.webpack.ts': ['webpack', 'sourcemap'] //preprocess with webpack and our sourcemap loader
        },

        /*
         * A list of reporters to use to display the test results. In order to
         * use the karma-mocha-reporter, you must npm install the module and
         * include it in the list of plugins.
         */
        reporters: ["mocha", 'junit', 'coverage', 'remap-coverage'],

        /*
         * If true, Karma will start and capture all configured browsers, run
         * tests and then exit with an exit code of 0 or 1 depending on whether
         * all tests passed or any tests failed.
         */
        singleRun: false,

        junitReporter: {
            outputDir: 'karmaResults', // results will be saved as $outputDir/$browserName.xml
            outputFile: 'testResults.xml', // if included, results will be saved as $outputDir/$browserName/$outputFile
            suite: '', // suite will become the package name attribute in xml testsuite element
            useBrowserName: false, // add browser name to report and classes names
            nameFormatter: undefined, // function (browser, result) to customize the name attribute in xml testcase element
            classNameFormatter: undefined, // function (browser, result) to customize the classname attribute in xml testcase element
            properties: {}, // key value pair of properties to add to the <properties> section of the report
            xmlVersion: null // use '1' if reporting to be per SonarQube 6.2 XML format
        },
        coverageReporter: {
            type: 'in-memory'
        },
        remapCoverageReporter: {
            'text-summary': null,
            'html': './karmaResults/coverageHTML',
            'cobertura': './karmaResults/coverageSummary.xml'
        },
        /*
         * This field is necessary because we are using webpack as a preprocessor.
         * You will need to specify the webpack configuration (although in this
         * case, we are simply leveraging the existing webpack.config.js file).
         *
         * If you have a different webpack.config.js file that's used for testing
         * purposes, you can specify that here.
         */
        webpack: webpackKarmaConfig,
        webpackMiddleware: {
            stats: {
                colors: true,
                hash: false,
                version: true,
                timings: false,
                assets: false,
                chunks: false,
                modules: false,
                reasons: false,
                children: false,
                source: false,
                errors: true,
                errorDetails: false,
                warnings: true
            }
            // or use next string: 
            //stats: 'errors-only'
        },
        tsconfig: "./tsconfig.json",
        mime: {
            'text/x-typescript': ['ts','tsx']
        }
    });
};