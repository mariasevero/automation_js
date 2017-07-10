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
    process.send({
      event: 'runner:extra',
      body: YelpSearchResultsPage.reportNumberOfSearchResults()
    });
    process.send({
      event: 'runner:extra',
      body: YelpSearchResultsPage.reportStarRatingByBizName()
    });
  });

  this.When(/^I click on the name of restaurant (\d+)$/, function (elementNumber) {
    YelpSearchResultsPage.openBusinessPageByPosition(elementNumber);
  });

  this.When(/^I apply filters$/, function (tableValues) {
    const hashes = tableValues.hashes();
    YelpSearchResultsPage.applyFilters(hashes);
  });
};
