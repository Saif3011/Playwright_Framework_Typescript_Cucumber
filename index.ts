
var reporter = require('cucumber-html-reporter');
import dotenv from "dotenv";
var options = {
        theme: 'bootstrap',
        jsonFile: 'reports/cucumber_report.json',
        jsonDir:'reports/',
        output: 'reports/cucumber_report_Bootstrap.html',
        reportSuiteAsScenarios: true,
        scenarioTimestamp: true,
        launchReport: false,
        columnLayout:1,
        screenshotsDirectory:'reports/',
        metadata: {
            browser:"" ,
            app_url :""
        },
        failedSummaryReport: true,
    };
function generateHtml() {
    dotenv.config({
        path: `${process.cwd()}/config/.env.${process.env.npm_config_env}`
      })
let browserType = process.env.browser
    options.metadata.browser=browserType!
    options.metadata.app_url=process.env.AppUrl!
    reporter.generate(options); 
}
generateHtml()

    //more info on `metadata` is available in `options` section below.

    //to generate consodilated report from multi-cucumber JSON files, please use `jsonDir` option instead of `jsonFile`. More info is available in `options` section below.
