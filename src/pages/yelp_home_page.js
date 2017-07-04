class YelpHomePage {

  get findInput() { return browser.element('#find_desc'); }
  get findCategoryList() { return browser.element('[class*=suggestions-list-container]:not([class*=hidden])'); }

  /**
   * @desc: clicks on the find field so that categories option are displayed.
   */
  clickFindInput() {
    this.findInput.click();
  }

  /**
   * @desc: selects a category from the list displayed after clicking Find input field.
   * @var: categorySelector is the selector of the category passed in the function argument
   */
  selectCategoryFromList(findCategoryValue) {
    this.findCategoryList.waitForVisible(5000);
    const categorySelector = `[data-suggest-query='${findCategoryValue}'] .suggestion-title`;
    browser.element(categorySelector).click();
  }
}
module.exports = new YelpHomePage();
