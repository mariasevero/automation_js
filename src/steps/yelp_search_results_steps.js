'use strict';

var YelpSearchResultsPage = require('../pages/yelp_search_results_page.js');

module.exports = function(){

	this.When(/^User appends ([^"]*) in the Find search field$/, function(findValue){
		YelpSearchResultsPage.appendFindInput(findValue);
	});

	this.When(/^User clicks on "Search" button$/, function(){
		YelpSearchResultsPage.clickSearchButton();
	});

	this.Then(/^A list of restaurants is displayed$/, function(){
		var isListPresent = YelpSearchResultsPage.isSearchResultsListPresent();
		expect(isListPresent).to.equal(true, `List of results is present: ${isListPresent}`);
	});

	this.Then(/^Console reports total number of Search results with number of results in the current page$/, function(){
		var printData = YelpSearchResultsPage.logNumberOfSearchResults();
	});

	this.Then(/^Console reports the star rating of each of the results in the first result page$/, function(){
		YelpSearchResultsPage.logStarRatingByBizName();
	 });

	this.When(/^User clicks on the name of restaurant (\d+)$/, function(elementNumber){
		YelpSearchResultsPage.openBusinessPageByPosition(elementNumber);
	});

	this.When(/^User applies filter values$/, function(table_values){
		var hashes = table_values.hashes();
		YelpSearchResultsPage.applyFilters(hashes);
	});
}