const YelpSearchResultsPage = require('../pages/yelp_search_results_page.js');

module.exports = function () {
  this.When(/^I add ([^"]*) to the search$/, function (findValue) {
    YelpSearchResultsPage.appendFindInput(findValue);
  });

  this.When(/^I click on "Search" button$/, function () {
    YelpSearchResultsPage.clickSearchButton();
  });

  this.Then(/^A list of restaurants is displayed$/, function () {
    const isListPresent = YelpSearchResultsPage.isSearchResultsListPresent();
    expect(isListPresent).to.equal(true, `List of results is present: ${isListPresent}`);
  });

  this.Then(/^Console reports total number of Search results with number of results in the current page$/, function () {
    YelpSearchResultsPage.logNumberOfSearchResults();
  });

  this.Then(/^Console reports the star rating of each of the results in the first result page$/, function () {
    YelpSearchResultsPage.logStarRatingByBizName();
  });

  this.When(/^I click on the name of restaurant (\d+)$/, function (elementNumber) {
    YelpSearchResultsPage.openBusinessPageByPosition(elementNumber);
  });

  this.When(/^I apply filters$/, function (tableValues) {
    const hashes = tableValues.hashes();
    YelpSearchResultsPage.applyFilters(hashes);
  });
};
