class YelpBusinessProfile {

  get bizNameTitle() { return browser.element('[class*=biz-page-title]'); }
  get bizAddressLabel() { return browser.element('.street-address'); }
  get bizPhoneLabel() { return browser.element('.biz-phone'); }
  get bizWebsiteLink() { return browser.element('.biz-website.js-add-url-tagging a'); }
  get customerReviewList() { return browser.elements('.review.review--with-sidebar .review-content p'); }

  isBusinessNameTitlePresent() {
    this.bizNameTitle.waitForVisible(10000);
    return this.bizNameTitle.isVisible();
  }

  logBusinessInfo() {
    let address = this.bizAddressLabel.getText();
    address = address.split('\n');

    console.log(`\n ******** BUSINESS INFORMATION FOR: ${this.bizNameTitle.getText()}  ********` +
                `\n Address: ${address[0]}, ${address[1]
                }\n Phone: ${this.bizPhoneLabel.getText()
                }\n Website by text: ${this.bizWebsiteLink.getText()}`);
  }

  logCustomerReviews(numberOfReviews) {
    let ammountOfReviews = numberOfReviews;
    console.log('\n-------- REVIEWS --------\n');
    if (ammountOfReviews > this.customerReviewList.value.length) {
      console.log('There are not enough reviews for this business.');
      ammountOfReviews = this.customerReviewList.value.length;
    } else {
      for (let i = 0; i < numberOfReviews; i += 1) {
        const customerReviewText = browser.elementIdText(this.customerReviewList.value[i].ELEMENT).value;
        const reviewNumber = i + 1;
        console.log(`============================== Review ${reviewNumber} ==============================\n${
                    customerReviewText}\n`);
      }
    }
  }
}

module.exports = new YelpBusinessProfile();
