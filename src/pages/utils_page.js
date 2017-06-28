'use strict';

class UtilsPage {

    goTo(site){
        browser.url(site);
    }

    getUrl() {
      return browser.getUrl();
    }

	waitAndClickForSelector(selector, timeout){
  		browser.waitForVisible(selector, timeout);
  		browser.click(selector);
  	}

	waitAndClickForElement(element, timeout){
      element.waitForVisible(timeout);
      element.click();
    }

  clickOnElementWithTitle(all_elements, title){
      var my_element;
      all_elements.waitForVisible(50000);
      console.log('Title: ' + title);
      all_elements.value.forEach(function(elem){
        console.log('browser.elementIdText(elem.ELEMENT).value: ' + browser.elementIdText(elem.ELEMENT).value);
        if (browser.elementIdText(elem.ELEMENT).value == title) {
          my_element = elem.ELEMENT;
        }
      });

      if (my_element != null) {
        browser.elementIdClick(my_element);
        console.log('Clicked: ' + title);
        return true;
      }else{
        return false;
      }

    }

  clickOnElementWithTitleBySelector(selector, title){
      browser.waitForExist(selector, 30000);
      var all_elements = browser.elements(selector);
      var my_element;
      console.log('Title: ' + title);
      all_elements.value.forEach(function(elem){
        console.log('browser.elementIdText(elem.ELEMENT).value: ' + browser.elementIdText(elem.ELEMENT).value);
        if (browser.elementIdText(elem.ELEMENT).value == title) {
        	my_element = elem.ELEMENT;
        }
      });

      if (my_element != null) {
        browser.elementIdClick(my_element);
        console.log('Clicked: ' + title);
        return true;
      }else{
        return false;
      }

    }

    waitForElementExists(element){
      var retries = 5;
      var success = false;

      while (retries-- > 0 && !(success = element.isExisting())) {
        browser.pause(2000);
      }
    }

    waitForPageToLoad(){
      var retries = 5;

      while (retries-- > 0 && ("complete" == browser.execute(function(){return document.readyState;}))) {
        browser.pause(2000);
      }
    }

  isElementPresent(element){
    console.log('element present?');
    element.waitForVisible(10000);
    return element.isExisting();
  }

  // Generates valid emails using a single email account
  // At the moment doesn't check for duplicated emails
  generateEmail(email){
    var values = email.split('@');
    var name = values[0];
    var domain = values[1];
    var newEmail = name + "+" + Math.floor(1000 + Math.random() * 9000) + domain;

    return newEmail;
  }

  //Generates a random alphanumeric password with 'length' characters long 
  generatePasswordByLength(length){
    var password = Math.random().toString(36).substr(2, length);

    return password;
  }

}

module.exports = new UtilsPage();