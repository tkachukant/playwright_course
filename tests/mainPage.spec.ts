import { test } from "@playwright/test";
import { MainPage } from "../pages/mainpage";
import { Header } from "../pages/components/header";
import { Search } from "../pages/components/Search";

let mainPage: MainPage;
let header: Header;
let search: Search;
let textSearch = "Smart Water Leak Detector";

test.describe("Main Page verifications", () => {
  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    header = new Header(page);
    search = new Search(page);
    await mainPage.goto();
    await header.openSearch();
  });

  test("Verify main page UI", async ({ page }) => {
    await mainPage.verifyTitleAndUrl();
    await header.validateHeaderLogo();
    await header.verifyAccountLink();
    await header.openSearch();
  });
  test("Search by valid SKU", async ({ page }) => {
    await search.searchSKU("200439");
    await search.verifyResultsCountGreaterThanZero();
  });

  test("Search by invalid SKU", async ({ page }) => {
    await search.searchSKU("1234");
    await search.verifyNoResults();
  });

  test("Search by text ", async ({ page }) => {
    await search.searchByText(textSearch);
    await search.verifySearchResult();
  });
});
