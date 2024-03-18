import { Given, When, Then, setDefaultTimeout, Before, After } from '@cucumber/cucumber'
import { Browser, BrowserContext, Page, chromium } from 'playwright'
import { expect } from "@playwright/test"
import { getPage } from '../../corelib/corelib.spec';
import LoginPage from '../pages/loginPage'

let loginPage: LoginPage;
Given('User is on login page', async function () {
    
    this.attach('this is start if user in login page ')
    loginPage = new LoginPage(getPage(), this.attach)
    await loginPage.gotoApp()
    this.attach('login is successful ')
    this.parameters.a = 10
});

When('User enter login details', async function () {
    await loginPage.loginToApp()
});

Then('Home page should be displayed', async function () {
    await loginPage.ishomePageVisible()
});

When('Upon logout', async function () {
    await loginPage.logout()
    this.attach('logout is successful ')
    console.log(`login page value is : ${this.parameters.a}`)
});
Then('Logout should be successfull', async function () {
    this.attach("Logout should be successfull");

});
Then('this is a  dummy step to fail', async function () {
    expect(1).toBe(2)

});