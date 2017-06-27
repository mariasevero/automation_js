'use strict';

class YelpBusinessProfile{

	get bizNameTitle() { return browser.element("[class*=biz-page-title]"); }

	get bizAddress() { return browser.element(".street-address"); }
	get bizPhone() { return browser.element(".biz-phone"); }
	get bizWebsite() {return browser.element(".biz-website.js-add-url-tagging a"); }
	get customerReview() { return browser.elements(".review.review--with-sidebar .review-content p"); }

	isBusinessNameTitlePresent(){
		this.bizNameTitle.waitForVisible(10000);
		return this.bizNameTitle.isVisible();
	}

	printBusinessInfo(){
		var address = this.bizAddress.getText();
		address = address.split("\n");

		console.log("\n ******** BUSINESS INFORMATION FOR: " + this.bizNameTitle.getText() + "  ********" + 
					"\n Address: " + address[0] + ", " + address[1] +
					"\n Phone: " + this.bizPhone.getText() + 
					"\n Website by text: " + this.bizWebsite.getText()	
					);
	}

	printCustomerReviews(numberOfReviews){

		console.log("-------- REVIEWS --------");

		if (numberOfReviews > this.customerReview.value.length) {
			console.log('number of reviews alaallala');
			numberOfReviews = this.customerReview.value.length;
		}



		for (var i = 0 ; i < numberOfReviews; i++) {
			var customerReviewText = browser.elementIdText(this.customerReview.value[i].ELEMENT).value;
			var reviewNumber = i + 1;
			console.log("============================== Review " + reviewNumber + " ==============================\n" +  
					 	customerReviewText + "\n");
		}		
	}


}

module.exports = new YelpBusinessProfile();