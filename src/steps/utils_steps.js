var UtilsPage = require('../pages/utils_page.js');

module.exports = function() {

	this.Given(/^I open the url "([^"]*)"$/, function(site) {
		UtilsPage.goTo(site);
	});

};