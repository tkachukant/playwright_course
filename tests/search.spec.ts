import { test } from "@playwright/test";
import { MainPage } from "../pages/mainpage";
import { Search } from "../pages/components/Search";
import { Header } from "../pages/components/header";
 
test("Search valid SKUs", async ({ page }) => {
  const mainpage = new MainPage(page);
  const search = new Search(page);
  const header = new Header(page)
  const validSKU = "200439";
 
  await mainpage.goto();
  await header.openSearch();
  await search.searchSKU(validSKU);


});

/*
1) поиск по тексту, проверить текст results, какое то кол-во результатов (>0), проверить что на 1 товаре тайтл соответствует поисковому значению
2) рефакторинг (разделить метод проверки хедера на разные)
*/