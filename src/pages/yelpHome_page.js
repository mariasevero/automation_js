'use strict';

class YelpHomePage{

	get findInput() { return browser.element("#find_desc"); }
	get findSuggestionsList() { return browser.element("[class*=suggestions-list-container]:not([class*=hidden])"); }

	
	clickFindInput(){
		this.findInput.click();
	}

	selectFindSuggestion(findCategoryValue){
		
		this.findSuggestionsList.waitForVisible(5000);
		var selector = `[data-suggest-query='${findCategoryValue}'] .suggestion-title`;
		browser.element(selector).click();
	
	}

}

module.exports = new YelpHomePage();

