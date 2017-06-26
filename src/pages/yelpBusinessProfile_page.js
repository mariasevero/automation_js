'use strict';

class YelpBusinessProfile{

	get businessNameTitle() { return browser.element("[class*=biz-page-title]"); }

	isBusinessNameTitlePresent(){
		this.businessNameTitle.waitForVisible(10000);
		return this.businessNameTitle.isVisible();
	}

	printBusinessInfo(){
		
	}

}

module.exports = new YelpBusinessProfile();