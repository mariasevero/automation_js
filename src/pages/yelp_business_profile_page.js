class YelpBusinessProfile {

  get bizNameTitle() { return browser.element('[class*=biz-page-title]'); }
  get bizAddressLabel() { return browser.element('.street-address'); }
  get bizPhoneLabel() { return browser.element('.biz-phone'); }
  get bizWebsiteLink() { return browser.element('.biz-website.js-add-url-tagging a'); }
  get customerReviewList() { return browser.elements('.review.review--with-sidebar .review-content p'); }

  /**
   * @desc: checks if the bussines name title is present.
   * @return: true or false.
   */
  isBusinessNameTitlePresent() {
    this.bizNameTitle.waitForVisible(10000);
    return this.bizNameTitle.isVisible();
  }

  /**
   * @desc: reports business critical information
   * @var: address contains bussiness address.
   */
  reportBusinessInfo() {
    let address = this.bizAddressLabel.getText();
    address = address.split('\n');

    const business = {
      title: this.bizNameTitle.getText(),
      address: `${address[0]}, ${address[1]}`,
      phone: this.bizPhoneLabel.getText(),
      website: this.bizWebsiteLink.getText(),
    };
    return business;
  }

  /**
   * @desc: reports business reviews
   * @var: ammountReviews has the value of the argument and contains the number of reviews
   *       that will be printed.
   */
  reportCustomerReviews(numberOfReviews) {
    let ammountOfReviews = numberOfReviews;

    if (ammountOfReviews > this.customerReviewList.value.length) {
      const error = 'There are not enough reviews for this business.';
      ammountOfReviews = this.customerReviewList.value.length;
      return error;
    }
    const reviews = [];
    for (let i = 0; i < numberOfReviews; i += 1) {
      const reviewNumber = i + 1;
      const customerReviewText = browser.elementIdText(this.customerReviewList.value[i].ELEMENT).value;

      const businessReviews = {
        reviewNumber,
        review: customerReviewText,
      };
      reviews.push(businessReviews);
    }
    return { reviews };
  }
}

module.exports = new YelpBusinessProfile();
