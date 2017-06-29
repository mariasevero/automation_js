'use strict';

class YelpHomePage{

	get findInput() { return browser.element("#find_desc"); }
	get findCategoryList() { return browser.element("[class*=suggestions-list-container]:not([class*=hidden])"); }

	clickFindInput(){
		this.findInput.click();
	}

	/**
	 * The selectCategoryFromList method selects an element from the findCategoryList. The selected element
	 * is passed as an argument whose origin is in the scenario definition of the yelp_search feature.
	 */
	selectCategoryFromList(findCategoryValue){
		this.findCategoryList.waitForVisible(5000);
		var selector = `[data-suggest-query='${findCategoryValue}'] .suggestion-title`;
		browser.element(selector).click();
	}
}
module.exports = new YelpHomePage();

