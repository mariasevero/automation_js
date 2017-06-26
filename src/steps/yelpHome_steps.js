'use strict';

var YelpHomePage = require('../pages/yelpHome_page.js');

module.exports = function(){

		this.When(/^User selects ([^"]*) in the drop-down box in Find$/, function(findCategoryValue){
			YelpHomePage.clickFindInput();
			YelpHomePage.selectFindSuggestion(findCategoryValue);
		});

}