@smoke
Feature: Login to production
    In order to perform successful Login
    As a user
    I want to enter correct username and password

    Scenario: In order to verify login to facebook on Production

        Given I go to "http://www.way2automation.com/angularjs-protractor/banking/#/login"
        When I found the title as "Protractor practice website - Banking App"
        And I click on customer login button
        And I select the value as "Harry Potter"
        And I click on login
        Then I should be able to see login as "Harry Potter"


    Scenario: In order to verify login to Gmail on Production

        Given I go to "http://www.way2automation.com/angularjs-protractor/banking/#/login"
        When I found the title as "Protractor practice website - Banking App"
        And I click on customer login button
        And I select the value as "Harry Potter"
        And I click on login
        Then I should be able to see login as "Harry Potter"


