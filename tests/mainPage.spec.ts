import { test } from "@playwright/test";
import { MainPage } from "../pages/mainpage";
import { Header } from "../pages/components/header";
import { Search } from "../pages/components/Search";

test("Verify main page UI", async ({ page }) => {
  const mainPage = new MainPage(page);
  const header = new Header(page);
  const search = new Search(page);
  const textSearch = "Smart Water Leak Detector";

  await mainPage.goto();
  await mainPage.verifyTitleAndUrl();
  await header.validateHeaderLogo();
  await header.verifyAccountLink();
  await header.openSearch();
  await search.searchSKU("200439");
  await search.verifyResultsCountGreaterThanZero();
  await search.searchSKU("1234");
  await search.verifyNoResults();
  await search.searchByText(textSearch);
  await search.verifySearchResult();
});
