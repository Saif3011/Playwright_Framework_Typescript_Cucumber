Feature: test login functionnality

Scenario: test login functionnality
Given User is on login page
When User enter login details
Then Home page should be displayed
When Upon logout
Then Logout should be successfull
And this is a  dummy step to fail