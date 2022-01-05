#Steps to run test case 

npm  install package.json // for the 1st time to install dependencies 

./node_modules/.bin/cypress run --spec cypress/integration/CartAndDiscountTest.js // to run the test case 

$HOME/rocketlane/cypress/report/index.html // results can be seen here

Using https://www.npmjs.com/package/mochawesome-report-generator for reports 

To retry failure cases runMode/openMode value needs to be set in cypress.json, by default it's set to 0 
