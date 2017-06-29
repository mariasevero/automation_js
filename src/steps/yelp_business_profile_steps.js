'use strict';

var YelpBusinessProfile = require('../pages/yelp_business_profile_page.js');

module.exports = function(){

	this.Then(/^Business profile is opened$/, function(){
		var isTitlePresent = YelpBusinessProfile.isBusinessNameTitlePresent()
		expect(isTitlePresent).to.equal(true, `Business title is present: ${isTitlePresent}`);
	});

	this.Then(/^Console reports critical information of the restaurant$/, function(){
		YelpBusinessProfile.logBusinessInfo();
		YelpBusinessProfile.logCustomerReviews(3);  //Number of reviews to display: 3 (by document).
	});

}