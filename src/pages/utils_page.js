class UtilsPage {

  /**
   * @desc: opens the site passed in the argument.
   */
  goTo(site) {
    browser.url(site);
  }

}

module.exports = new UtilsPage();
