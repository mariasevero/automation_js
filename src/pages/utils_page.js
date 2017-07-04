class UtilsPage {

  goTo(site) {
    browser.url(site);
  }

}

module.exports = new UtilsPage();
