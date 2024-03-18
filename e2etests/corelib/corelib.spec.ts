import { Given, When, Then, setDefaultTimeout, Before, After, BeforeAll, AfterAll, BeforeStep, AfterStep, Status } from '@cucumber/cucumber'
import { Browser, BrowserContext, Page, chromium, firefox } from 'playwright'
import { expect } from "@playwright/test"
import dotenv from "dotenv";
setDefaultTimeout(1000 * 60 * 2);


let browser: Browser
let bCtx: BrowserContext
let page: Page


BeforeAll(async function () {
  //read from env file
  dotenv.config({
    path: `${process.cwd()}/config/.env.${process.env.npm_config_env}`
  }
  );

  let browserType = process.env.browser
  switch (browserType) {
    case 'chrome':
    case 'GC':
      browser = await chromium.launch({ headless: false, channel: "chrome", args: ["--start-maximized"] })
      break;
    case 'firefox':
    case 'FF':
      browser = await firefox.launch({ headless: false, args: ["--start-maximized"] })
      break;
    case 'edge':
    case 'msedge':
      browser = await chromium.launch({ headless: false, channel: "msedge", args: ["--start-maximized"] });
      break;
    default:
      throw new Error(`Invalid brower type ${browserType} is passed !!!  please correct it `)
      break;
  }




})


Before(async function (scenario) {

  bCtx = await browser.newContext({ viewport: null, javaScriptEnabled: true })
  page = await bCtx.newPage()
  await page.goto(process.env.AppUrl!)
  this.attach(`----------${scenario.pickle.name} is started ----------`);

})


BeforeStep(async function (scenario) {
  this.attach(`----------${scenario.pickleStep.text} is started ----------`);
})
AfterStep(async function (scenario) {
  this.attach(`----------${scenario.pickleStep.text} is started ----------`);
})




After(async function (scenario) {
  this.attach(`----------${scenario.pickle.name} is ended ----------`);
  this.attach(`Scenario status is >>>>>>>>>${scenario.result?.status} >>>>>>>>>>`);
  if (scenario.result?.status == Status.FAILED) {
    this.attach('this is a sample test of string')
    const obj = {
      "name":"saif",
      "job" : "tester"
    }

    this.attach(JSON.stringify(obj),'application/json') 


    this.attach('--------------I am taking a screenshot !!! ------------');
    const img = await page.screenshot({
      path : `./reports/${scenario.pickle.name}.png`
    })
    // to attach screenShot to report
    this.attach(img ,'image/png')
  }
  await page.close()
  await bCtx.close()
  
});
AfterAll(async function () {
  await browser.close()
});



//export{page}
export function getPage(): Page {
  return page
}