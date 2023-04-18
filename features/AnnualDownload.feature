@annualdownload
Feature: Annual download

  As site visitor
  I need to be able to download reports of agency FOIA data

  Background:
    Given I am on "/data.html"
    And I wait 15 seconds

  Scenario: The report downloads work
    And I enter "OIP" into the annual report agency search box
    And I choose "Requests" from the data type dropdown
    And I check the box for the year "2020"
    And I hard click on "the download csv button"
    And I hard click on "the View Report button"
    And I wait 12 seconds
    Then I should see "Report Results"
    And I should see "1785"
    And I wait 3 seconds
    And I hard click on "the download csv button"
