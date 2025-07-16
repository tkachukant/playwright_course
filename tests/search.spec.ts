import { test, expect, Page } from "@playwright/test";

test.describe("Search functionality", () => {
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();

    await page.goto("/", { waitUntil: "domcontentloaded" });
  });
  test("Open search", async () => {
    const searchLink = page.locator('a[href="/search"].Heading');
    const searchInput = page.locator('input[placeholder="Search..."]');
    const validSKU = "200439";
    const result = page.locator(".Search__Results .ProductItem");
    const invalidSKU = "12321321";

    await expect(searchLink).toBeVisible();
    await searchLink.click();
    await expect(searchInput).toBeVisible();
    const [response] = await Promise.all([
      page.waitForResponse(
        (resp) =>
          resp.url().includes(`/search?view=ajax&q=${validSKU}`) &&
          resp.url().includes("&type=product")
      ),
      await searchInput.fill(validSKU),
    ]);
    expect(response.status()).toBe(200);
    await expect(result).toBeVisible();
    await expect(result).toHaveCount(1);
    //invalid SKU typing
    await searchInput.fill(invalidSKU);
    await expect(page.getByText("No results could be found")).toBeVisible();
    
  });
});
