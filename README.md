#Steps to run test case 

Initial dependency installation - npm  install package.json 

Fixtures - cypress/fixtures/inputdata.json

Utils - cypress/support/utils.js

Custom commands - cypress/support/commands.js 

Test Case - cypress/integration/CartAndDiscountTest.js

Report - $HOME/rocketlane/cypress/report/index.html

Run testcase - ./node_modules/.bin/cypress run --spec cypress/integration/CartAndDiscountTest.js 


Using https://www.npmjs.com/package/mochawesome-report-generator for reports 

To retry failure cases runMode (cypress run)/openMode(cypress open) value needs to be set in cypress.json, by default it's set to 0 
