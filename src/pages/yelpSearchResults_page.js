'use strict';

class YelpSearchResults{

	get findInput() { return browser.element("#find_desc"); }
	get findSuggestionsList() { return browser.element("[class*=suggestions-list-container]:not([class*=hidden])"); }
	get searchButton() { return browser.element("#header-search-submit"); }
	get allFiltersButton() { return browser.element("//*[@id='wrap']//*[@class='suggested-filters_filter-list']//li[7]"); }
	get priceFilter() { return browser.element(".filter-set.price-filters"); }
	get categoryFilter() { return browser.element(".filter-set.category-filters"); }
	
	get searchResultsList() { return browser.element("#super-container [class*=search-results-block] .search-results-content"); }
	get searchResult() { return browser.elements(".regular-search-result"); }
	
	get bizNameLabel() { return browser.element(".indexed-biz-name"); }
	get paginationLabel() { return browser.element(".pagination-results-window"); }



	clickFindInput(){
		this.findInput.click();
	}

	appendFindInput(findValue){
		var currentValue = this.findInput.getValue();
		this.findInput.setValue(currentValue + " " + findValue);
	}

	clickSearchButton(){
		this.searchButton.click();
	}

	isSearchResultsListPresent(){
		this.searchResultsList.waitForVisible(10000);
		return this.searchResultsList.isVisible();
	}

	/*
									---- getPaginationData() info ----

	 PaginationLabel element has a value of the format "             Showing 1-10 of 1965         "	
	 In the getPaginationData method, the text is stored in paginationText and blank spaces are trimmed.
	 Then the text is splitted by blank spaces and each section is stored in paginationData array.
	 Words are removed from paginationData array.
	 The first value which has the format "1-10" is sliced into two and stored in resultsPerPage array.
	 Finally, the first value "1-10" is removed and value 1 of resultsPerPage  "10" is added in its place.  
	 At the end the method returns an array with 2 elements, the number of results per page and the total search results.
	
	 */
	printPaginationData(){
		var paginationText = browser.getHTML('.pagination-results-window', false);
		paginationText = paginationText.trim();

		var paginationData = paginationText.split(" ");
		paginationData.splice(0,1);
		paginationData.splice(1,1);

		var resultsPerPage = paginationData[0];
		resultsPerPage = resultsPerPage.split("-");

		paginationData.splice(0, 1, resultsPerPage[1]);

		console.log("\n ******** REPORT OF SEARCH RESULTS: NUMBER OF RESULTS ********");
		console.log("Total number of results: " + paginationData[0]);
		console.log("Results in the current page: " + paginationData[1]);

	}


	printStarRatingByBizName(){
		browser.pause(5000);
		var bizNameSelector = ".indexed-biz-name";
		var bizStarRating = "[class*='i-stars']";

		console.log("\n ******** REPORT OF SEARCH RESULTS: BUSINESS RATINGS ********");
		this.searchResult.value.forEach(function(element){
			var title = browser.elementIdElement(element.ELEMENT,bizNameSelector).getText();
			var stars = browser.elementIdElement(element.ELEMENT,bizStarRating).getAttribute('title');
			console.log(title + ': ' + stars); 
		});
	}

	
	openBusinessPageByPosition(elementNumber){
		var bizNameSelector = `[data-key='${elementNumber}'] .indexed-biz-name`;
		browser.element(bizNameSelector).click();
	}





}

module.exports = new YelpSearchResults();











	// tryThisForHash(hash){

	// 	// console.log("Price: " + hash["Price"]);
	// 	console.log(">>>>>>>>> " + hash.rowsHash());
	// 	// console.log("Category: " + hash["Category"]);
	// }