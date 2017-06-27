'use strict';

class YelpBusinessProfile{

	get bizNameTitle() { return browser.element("[class*=biz-page-title]"); }

	get bizAddress() { return browser.element(".street-address"); }
	get bizPhone() { return browser.element(".biz-phone"); }
	get bizWebsite() {return browser.element(".biz-website.js-add-url-tagging a"); }
	//get customerReview() { return browser.elements$$(".review.review--with-sidebar .review-content p"); }

	isBusinessNameTitlePresent(){
		this.bizNameTitle.waitForVisible(10000);
		return this.bizNameTitle.isVisible();
	}

	printBusinessInfo(){
		var address = this.bizAddress.getText();
		address = address.split("\n");

		var website = this.bizWebsite.getAttribute('href');
		console.log("Catched href is: " + website);
		var websiteURL = website.split("url");
		var websiteURL = websiteURL[1].split("%2F", );
		console.log("\nArray is:" + websiteURL);

		console.log("\n ******** BUSINESS INFORMATION: " + this.bizNameTitle.getText() + "  ********" + 
					"\n Address: " + address[0] + ", " + address[1] +
					"\n Phone: " + this.bizPhone.getText() + 
					"\n Website: " + websiteURL[2] +
					"\n Website by text: " + this.bizWebsite.getText()	
					);
	}

	printCustomerReviews(){
		var customerReview = browser.elements(".review.review--with-sidebar .review-content p"); 

		console.log("-------- REVIEWS --------");

		customerReview.value.forEach(function(element){

			var reviewText = browser.elementIdElement(element.ELEMENT,customerReview).getValue();

			console.log("\n" + reviewText +
						"\n ---");

		});
	}


}

module.exports = new YelpBusinessProfile();