Automation: Cucumber + WebdriverIO + JS
========================================

## Download sublime 3: https://www.sublimetext.com/3
- Command + shift + p > Install Package Control
- Command + shift + p > Package Control: Install Package
- Cucumber
- Cucumber Step FInder
- AllAutocomplete
## Download SourceTree: https://www.sourcetreeapp.com/
## Install brew: https://brew.sh/
## Install xcode from Apple Store.
## Install latest SDK.
## Install node.js and NPM
- $ brew install node
- $ brew install npm
## Open a console > move to the project folder > run: $ npm install -g
## Install dependencies:
- $ npm install webdriverio -g
- $ npm install wdio-selenium-standalone-service -g
- $ npm install babel-preset-es2015 --save
- $ npm install chai -g
- $ npm install --save-dev chai
- $ npm install wdio-spec-reporter -g
- $ npm install wdio-cucumber-framework -g
## If needed install:
- $ npm install selenium-standalone@latest -g
- $ selenium-standalone install
- $ selenium-standalone start
- $ npm install babel-register -g
- $ npm install babel-preset-es2015 -g
## Install chromedriver:
- $ brew install chromedriver
## Any missing dependency should be installed like:
- $ npm install [dependency] -g
## To run all features: wdio
## To run an specific feature: wdio wdio.conf.js --spec ./src/features/<feature_name>.feature

## Webdriver documentation: http://webdriver.io/