import { Page } from "playwright";
import { ICreateAttachment, ICreateLog } from "@cucumber/cucumber/lib/runtime/attachment_manager";
export default class BasePage {

    protected page: Page;
    protected log: ICreateAttachment


    constructor(page: Page, log: ICreateAttachment) {
        this.page = page;
        this.log = log
    }

    async enter(object: any, data: string) {

        await this.getLocator(object).fill(data, object["actionOptions"])
        console.log(`entered value ${data} on ${object["description"]} `);

    }
    async click(object: any) {

        await this.getLocator(object).click(object["actionOptions"])
        console.log(`clicked on ${object["description"]}`);

    }

    getLocator(object: any) {

        return this.page.locator(object["locator"], object["locatorOptions"])

    }
}