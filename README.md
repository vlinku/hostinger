Details about the Automation testing assigment:

Test is written with Typescript on the Playwright framework.
Used VS Code program to write code.
Test is flaky and may need to be run several times to pass successfully.
Performed only on the Chromium Browser and in the headed mode.
Tests are running faster than the page is loaded. And since I could not figure out how to upload config file, in the tests there will be couple lines with waitForTimeout() function.
The best way to reproduce the test is: 6.1 To download Playwright to local computer by command "npm init playwright@latest" 6.2 Update config file, to comment out all browsers except chromium 6.3 Run the test using the buttons in the testing tab.
