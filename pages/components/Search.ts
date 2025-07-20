import { Locator, Page, expect } from "@playwright/test";

export class Search {
  readonly page: Page;

  readonly input: Locator;

  readonly results: Locator;

  constructor(page: Page) {
    this.page = page;

    this.input = page.locator('input[placeholder="Search..."]');

    this.results = page.locator(".Search__Results .ProductItem");
  }

  async searchSKU(sku: string) {
    await expect(this.input).toBeVisible()
    await this.input.fill(sku);
    await expect(this.input).toHaveValue(sku)
  }

  async verifyResultsCount(count: number) {
    await expect(this.results).toHaveCount(count);
  }

  async verifyNoResults() {
    await expect(
      this.page.getByText("No results could be found")
    ).toBeVisible();
  }
  
}
