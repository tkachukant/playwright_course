import { test, expect } from "@playwright/test";

test.describe("Main Page verifications", () => {
  const logoLink = "a.Header__LogoLink";

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded"); //загрузка страницы, дома
    //или
    await page.goto("/", { waitUntil: "domcontentloaded" });
  });
  test("Open website and check title", async ({ page }) => {
    const primaryImage = page.locator('[alt="The Connected Shop Logo"]');
    const primaryImage1 = page.locator(".Header__LogoLink img").nth(1);

    //homework
    const accountLink = page.locator(".Header__SecondaryNav a").first();
    const searchLink = page.locator('a[href="/search"].Heading');
    const cartLink = page.locator('a.Heading[data-drawer-id="sidebar-cart"]')

    await expect(page.locator(logoLink)).toHaveAttribute("href", "/");
    await expect(primaryImage).toHaveAttribute("loading", "lazy");
    await expect(primaryImage).toHaveAttribute(
      "alt",
      "The Connected Shop Logo"
    );
    await expect(primaryImage1).toHaveAttribute(
      "alt",
      "The Connected Shop Logo White"
    );
    await expect(page).toHaveURL("https://theconnectedshop.com/");
    await expect(page).toHaveTitle(
      "The Connected Shop - Smart Locks, Smart Sensors, Smart Home & Office"
    );
    //homework
    await expect(accountLink).toHaveAttribute("href", "/account");
    await expect(searchLink).toHaveAttribute("href", "/search");
    await expect(searchLink).toHaveAttribute("data-action", "toggle-search");
    await expect(searchLink).toBeVisible();
    await page.waitForTimeout(1000);
    await expect(searchLink).toBeVisible();
    await expect(cartLink).toHaveAttribute("aria-label", "Open cart")


  });
  test.afterEach(async ({ page }) => {
    await page.pause();
  });
});
