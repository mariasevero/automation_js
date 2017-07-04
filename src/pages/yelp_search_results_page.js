const UtilsPage = require('../pages/utils_page.js');

class YelpSearchResultsPage {

  get findInput() { return browser.element('#find_desc'); }
  get searchButton() { return browser.element('#header-search-submit'); }
  get allFiltersButton() { return browser.element("//*[@id='wrap']//*[@class='suggested-filters_filter-list']//li[7]"); }
  get moreCategoriesLink() { return browser.element('.filter-set.category-filters a'); }
  get moreCategoryOverlySearchButton() { return browser.element('.ybtn.ybtn-primary.ybtn-small'); }
  get searchResultsList() { return browser.element('#super-container [class*=search-results-block] .search-results-content'); }
  get searchResult() { return browser.elements('.regular-search-result'); }

  clickFindInput() {
    this.findInput.click();
  }

  appendFindInput(findValue) {
    const currentValue = this.findInput.getValue();
    this.findInput.setValue(`${currentValue} ${findValue}`);
  }

  clickSearchButton() {
    this.searchButton.click();
  }

  isSearchResultsListPresent() {
    this.waitForOverlayToFade();
    return this.searchResultsList.isVisible();
  }

   /**
    * @desc: gets the results pagination level and logs total number of search results and
    *        number of current page results.
    * @var: paginationText, paginationData and resultsPerPage contain strings or array of
    *       strings that are trimmed, splitted and modified until paginationData ends up
    *       only with 2 elements: the number of results per page and the total search results.
    *       The initial string is of the type "             Showing 1-10 of 1965         "
    *       and is taken from the pagination label.
   */
  logNumberOfSearchResults() {
    let paginationText = browser.getHTML('.pagination-results-window', false);
    paginationText = paginationText.trim();

    const paginationData = paginationText.split(' ');
    paginationData.splice(0, 1);
    paginationData.splice(1, 1);

    let resultsPerPage = paginationData[0];
    resultsPerPage = resultsPerPage.split('-');

    paginationData.splice(0, 1, resultsPerPage[1]);

    console.log('\n******** REPORT OF SEARCH RESULTS: NUMBER OF RESULTS ********' +
                `\nTotal number of results: ${paginationData[0]}` +
                `\nResults in the current page: ${paginationData[1]}`);
  }

  logStarRatingByBizName() {
    const bizNameSelector = '.indexed-biz-name';
    const bizStarRating = "[class*='i-stars']";

    console.log('\n ******** REPORT OF SEARCH RESULTS: BUSINESS RATINGS ********');
    this.searchResult.value.forEach(function (element) {
      const title = browser.elementIdElement(element.ELEMENT, bizNameSelector).getText();
      const stars = browser.elementIdElement(element.ELEMENT, bizStarRating).getAttribute('title');
      console.log(`${title}: ${stars}`);
    });
  }

  openBusinessPageByPosition(elementNumber) {
    const bizElement = `[data-key='${elementNumber}']`;
    const bizElementPresent = browser.element(bizElement).isVisible();
    const bizNameSelector = `[data-key='${elementNumber}'] .indexed-biz-name`;
    if (bizElementPresent) {
      this.waitForOverlayToFade();
      browser.scroll(bizNameSelector);
      browser.element(bizNameSelector).click();
    } else {
      console.log("The element can't be clicked because it was not found.");
    }
  }

  /*
   * This method can be used to apply any filter that is defined in the scenario data table
   * in the yelp_search feature.
   * For each filter, a selector has to be defined and then the applyTableValues method has
   * to be called.
  */
  applyFilters(hashes) {
    this.allFiltersButton.waitForVisible(3000);
    this.allFiltersButton.click();

    for (const x in hashes) {
      const priceSelector = '.filter-set.price-filters .radio-check';
      const categorySelector = '.filter-set.category-filters .main .category.radio-check';
      this.applyTableValues(hashes, x, priceSelector, 'Price', '.filter-label');
      this.waitForOverlayToFade();
      this.applyTableValues(hashes, x, categorySelector, 'Category', 'span');
    }
  }

  /*
   *  This method applies the scenario table values to the filters
  */
  applyTableValues(hashes, x, locator, hashKey, labelSelector) {
    if (hashes[x][hashKey] != null) {
      let selectedOption = false;
      browser.elements(locator).value.forEach(function (element) {
        const checkboxLabel = browser.elementIdElement(element.ELEMENT, labelSelector).getText();
        if (hashes[x][hashKey] === checkboxLabel) {
          browser.elementIdElement(element.ELEMENT, "[type='checkbox']").click();
          selectedOption = true;
        }
      });
      if (!selectedOption) {
        this.moreCategoriesLink.click();
        const another = '#category-filters-content .category.radio-check';
        this.applyTableValues(hashes, x, another, hashKey, labelSelector);
        this.moreCategoryOverlySearchButton.click();
        this.waitForOverlayToFade();
      }
    } else {
      console.log('The filter does not exist.');
    }
  }

  waitForOverlayToFade() {
    browser.waitUntil(function () {
      return browser.isVisible('.throbber-overlay:not([style*=none])') === false;
    }, 5000, 'Overlay is still present.');
  }
}

module.exports = new YelpSearchResultsPage();
