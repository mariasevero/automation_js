'use strict';

var UtilsPage = require('../pages/utils_page.js');

class YelpSearchResults{

	get findInput() { return browser.element("#find_desc"); }
	get searchButton() { return browser.element("#header-search-submit"); }
	
	get allFiltersButton() { return browser.element("//*[@id='wrap']//*[@class='suggested-filters_filter-list']//li[7]"); }
	get moreCategoriesLink() { return browser.element(".filter-set.category-filters a"); }
	get moreCategoryOverlySearchButton() { return browser.element(".ybtn.ybtn-primary.ybtn-small");}
	
	get searchResultOverlay() { return browser.elements(".throbber-overlay:not([style*=none])");}
	get searchResultsList() { return browser.element("#super-container [class*=search-results-block] .search-results-content"); }
	get searchResult() { return browser.elements(".regular-search-result"); }
	


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
		this.waitForOverlayToFade();
		this.searchResultsList.waitForVisible(3000);
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
		var bizElement = `[data-key='${elementNumber}']`;
		var bizElementPresent = browser.element(bizElement).isVisible();
		var bizNameSelector = `[data-key='${elementNumber}'] .indexed-biz-name`;
		
		// CHANGE
		browser.pause(10000);

		if(bizElementPresent){
			browser.element(bizNameSelector).click();
		}else{
			console.log("\n>>>>>\n>>>>>\n>>>>> No se encuentra el elemento para hacer click en su nombre");
		}	
	}

	/*
	 * This method can be used to apply any filter that is defined in the scenario data table
	 * in the yelp_search feature. 
	 * For each filter, a selector has to be defined and then the applyTableValues method has
	 * to be called.
	*/
	applyFilters(hashes){
		this.allFiltersButton.waitForVisible(3000);
		this.allFiltersButton.click();

		for(var x in hashes){
			var priceSelector = ".filter-set.price-filters .radio-check";
			var categorySelector = '.filter-set.category-filters .main .category.radio-check';
			
			this.applyTableValues(hashes, x, priceSelector, 'Price', '.filter-label');
			this.waitForOverlayToFade();
			this.applyTableValues(hashes, x, categorySelector, 'Category', 'span');
		}
		//browser.pause(10000);
	}

	/*
	 *  This method applies the scenario table values to the filters
	*/
	applyTableValues(hashes, x, locator, hashKey, labelSelector){
		if(hashes[x][hashKey] != null){
			var selectedOption = false;
				browser.elements(locator).value.forEach(function(element){
					var checkboxLabel = browser.elementIdElement(element.ELEMENT, labelSelector).getText();

					if(hashes[x][hashKey] == checkboxLabel){
						browser.elementIdElement(element.ELEMENT, "[type='checkbox']").click();
						selectedOption = true;
					}
				});

				if (!selectedOption) {
					this.moreCategoriesLink.click();
					var another = "#category-filters-content .category.radio-check";
					this.applyTableValues(hashes, x, another, hashKey, labelSelector);
					this.moreCategoryOverlySearchButton.click();
					this.waitForOverlayToFade();
				}
			}else{
				console.log("The filter does not exist");
		}	
	}

	waitForOverlayToFade(){
		browser.waitUntil(function () {
  		return browser.isVisible(".throbber-overlay:not([style*=none])") == false;
		}, 5000, 'Overlay is still present');
	}
}

module.exports = new YelpSearchResults();


