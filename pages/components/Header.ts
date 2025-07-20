import { Locator, Page, expect } from "@playwright/test";

export class Header {
  readonly page: Page;
  readonly logoLink: Locator;
  readonly logoPrimary: Locator;
  readonly logoWhite: Locator;
  readonly accountLink: Locator;
  readonly searchLink: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logoLink = page.locator("a.Header__LogoLink");
    this.logoPrimary = page.locator('img[alt="The Connected Shop Logo"]');
    this.logoWhite = page.locator(".Header__LogoLink img").nth(1);
    this.accountLink = page.locator(".Header__SecondaryNav a").first();
    this.searchLink = page.locator('a[href="/search"].Heading');
    this.cartLink = page.locator('a.Heading[data-drawer-id="sidebar-cart"]');
  }
  async verifyLogoLinkisVisible() {
    await expect(this.logoLink).toBeVisible();
  }

  async validateHeaderLogo() {
    // разделить на отдельные методы
    await expect(this.logoLink).toHaveAttribute("href", "/");
    await expect(this.logoPrimary).toHaveAttribute(
      "alt",
      "The Connected Shop Logo"
    );
    await expect(this.logoPrimary).toHaveAttribute("loading", "lazy");
    await expect(this.logoWhite).toHaveAttribute(
      "alt",
      "The Connected Shop Logo White"
    );
    await expect(this.cartLink).toHaveAttribute("aria-label", "Open cart");
  }

  async verifySearchLink() {
    await expect(this.searchLink).toBeVisible();
    await expect(this.searchLink).toHaveAttribute("href", "/search");
    await expect(this.searchLink).toHaveAttribute(
      "data-action",
      "toggle-search"
    );
  }

  async openSearch() {
    await this.searchLink.click();
  }
  async verifyAccountLink() {
    expect(this.accountLink).toBeVisible();
    await expect(this.accountLink).toHaveAttribute("href", "/account");
  }
}
