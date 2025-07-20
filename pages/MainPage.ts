import { Page, expect } from "@playwright/test";

export class MainPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("/", { waitUntil: "domcontentloaded" });
  }

  async verifyTitleAndUrl() {
    await expect(this.page).toHaveTitle(
      "The Connected Shop - Smart Locks, Smart Sensors, Smart Home & Office"
    );

    await expect(this.page).toHaveURL("https://theconnectedshop.com/");
  }
}
