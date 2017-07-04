const YelpHomePage = require('../pages/yelp_home_page.js');

module.exports = function () {
  this.When(/^I select ([^"]*)$/, function (findCategoryValue) {
    YelpHomePage.clickFindInput();
    YelpHomePage.selectCategoryFromList(findCategoryValue);
  });
};
