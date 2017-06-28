'use strict';

var YelpSearchResults = require('../pages/yelp_search_results_page.js');

module.exports = function(){

	this.When(/^User appends ([^"]*) in the Find search field$/, function(findValue){
		YelpSearchResults.appendFindInput(findValue);
	});

	this.When(/^User clicks on "Search" button$/, function(){
		YelpSearchResults.clickSearchButton();
	});

	this.Then(/^A list of restaurants is displayed$/, function(){
		var isListPresent = YelpSearchResults.isSearchResultsListPresent();
		expect(isListPresent).to.equal(true, `List of results is present: ${isListPresent}`);
	});


	this.Then(/^Console reports total number of Search results with number of results in the current page$/, function(){
		var printData = YelpSearchResults.printPaginationData();
	});


	this.Then(/^Console reports the star rating of each of the results in the first result page$/, function(){
		YelpSearchResults.printStarRatingByBizName();
	 });


	this.When(/^User clicks on the name of restaurant (\d+)$/, function(elementNumber){
		YelpSearchResults.openBusinessPageByPosition(elementNumber);
	});

	this.When(/^User applies filter values$/, function(table_values){
		var hashes = table_values.hashes();
		// var hardcodedfilter = "Price";
		YelpSearchResults.applyFilters(hashes);
	});

}