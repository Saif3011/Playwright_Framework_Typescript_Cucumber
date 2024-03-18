import { Page } from "playwright"
import { expect } from "@playwright/test"
import * as loginPageLoc from '../locators/loginPageLoc.json'
import BasePage from "../pages/basePage";
import { ICreateAttachment, ICreateLog } from "@cucumber/cucumber/lib/runtime/attachment_manager";



export default class LoginPage extends BasePage {

    constructor(page: Page, log: ICreateAttachment) {
        super(page, log)
    }

    async gotoApp() {


        await this.page.locator(loginPageLoc.loginLink.locator, loginPageLoc.loginLink.locatorOptions).click(loginPageLoc.loginLink.actionOptions)

    }

    async loginToApp() {
        //1) Using playwright
        //await this.page.locator(loginPageLoc.emailField.locator).fill('dummy1234@gmail.com')
        //await this.page.locator(loginPageLoc.passwordField.locator).fill('dummy1234@gmail.com')
        //await this.page.locator(loginPageLoc.loginBtn.locator).click()

        //2) Using method created in basePage
        this.log('I am in login page')
        await this.enter(loginPageLoc.emailField, process.env.user_name!)
        this.log(`I enter  ${process.env.user_name} on my email field`)
        await this.enter(loginPageLoc.passwordField, 'dummy1234@gmail.com')
        this.log(`I enter ${process.env.user_name} on my password field `)
        await this.click(loginPageLoc.loginBtn)
    }
    async ishomePageVisible() {
        await this.page.locator(loginPageLoc.editActLink.locator).waitFor(loginPageLoc.editActLink.actionOptions)
        expect(this.page.locator(loginPageLoc.editActLink.locator)).toBeVisible()
    }

    async logout() {
        //Approche 1)using click method created in base Page
        await this.click(loginPageLoc.logoutLink)
        //Approche 1)Using click playwright
        //await this.page.locator(loginPageLoc.logoutLink.locator).click()
        const myElem = loginPageLoc.continueBtn.locator as "alert" | "alertdialog" | "application" | "article" | "banner" | "blockquote" | "button" | "caption" | "cell" | "checkbox" | "code" | "columnheader" | "combobox" | "complementary" | "contentinfo" | "definition" | "deletion" | "dialog" | "directory" | "document" | "emphasis" | "feed" | "figure" | "form" | "generic" | "grid" | "gridcell" | "group" | "heading" | "img" | "insertion" | "link" | "list" | "listbox" | "listitem" | "log" | "main" | "marquee" | "math" | "meter" | "menu" | "menubar" | "menuitem" | "menuitemcheckbox" | "menuitemradio" | "navigation" | "none" | "note" | "option" | "paragraph" | "presentation" | "progressbar" | "radio" | "radiogroup" | "region" | "row" | "rowgroup" | "rowheader" | "scrollbar" | "search" | "searchbox" | "separator" | "slider" | "spinbutton" | "status" | "strong" | "subscript" | "superscript" | "switch" | "tab" | "table" | "tablist" | "tabpanel" | "term" | "textbox" | "time" | "timer" | "toolbar" | "tooltip" | "tree" | "treegrid" | "treeitem"
        await this.page.getByRole(myElem, loginPageLoc.continueBtn.actionOptions).click()
    }


}
