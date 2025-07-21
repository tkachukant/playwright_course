import { Locator, Page, expect } from "@playwright/test";

export class Search {
  readonly page: Page;
  readonly input: Locator;
  readonly resultItem: Locator;
  readonly resultText: Locator;
  readonly resultTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.input = page.locator('[name="q"]');
    this.resultItem = page.locator(".Search__Results .ProductItem");
    this.resultText = page.locator(".Segment__Title .Heading.Text--subdued");
    this.resultTitle = page.locator(".ProductItem__Title.Heading");
  }

  async searchSKU(sku: string) {
    await expect(this.input).toBeVisible();
    await this.input.fill(sku);
    await expect(this.input).toHaveValue(sku);
  }

  async searchByText(text: string) {
    await this.input.clear();
    await this.input.fill(text);
    await expect(this.resultText.first()).toBeVisible();
  }

  async verifyResultsCountGreaterThanZero() {
    const text = await this.resultText.first().textContent();
    expect(text).toBeTruthy();

    const match = text?.match(/(\d+)\s+results?/);
    expect(match).not.toBeNull();

    const countInText = Number(match?.[1]);
    expect(countInText).toBeGreaterThan(0);

    const count = await this.resultItem.count();
    expect(count).toBeGreaterThan(0);
  }

  async verifySearchResult() {
    const value = await this.input.inputValue();
    await expect(this.resultTitle.first()).toContainText(value);
  }

  async verifyNoResults() {
    await expect(
      this.page.getByText("No results could be found").first()
    ).toBeVisible();
  }
}
