const YelpHomePage = require('../pages/yelp_home_page.js');

module.exports = function () {
  this.When(/^User selects ([^"]*) in the drop-down box in Find$/, function (findCategoryValue) {
    YelpHomePage.clickFindInput();
    YelpHomePage.selectCategoryFromList(findCategoryValue);
  });
};
