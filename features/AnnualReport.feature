@annualreport
Feature: Annual report

  As site visitor
  I need to be able to run reports of agency FOIA data
  So that I can learn how the agencies are doing with the FOIA

  Background:
    Given I am on "/data.html"
    And I wait 15 seconds

  Scenario: The input sections are visible
    Then I should see "Create an Annual Report"
    And I should see "1. Select Agencies or Components"
    And I should see "2. Select Data Type(s)"
    And I should see "3. Select Fiscal Years"
    And I should see "View Report"
    And I should see "Download CSV"

  Scenario: The agency type-ahead works
    And I enter "OIP" into the annual report agency search box
    And I choose "Requests" from the data type dropdown
    And I check the box for the year "2020"
    And I hard click on "the View Report button"
    And I wait 12 seconds
    Then I should see "Report Results"
    And I should see "1785"

  Scenario: The data type is required
    And I enter "OIP" into the annual report agency search box
    And I check the box for the year "2020"
    And I hard click on "the View Report button"
    Then I should see "A Data Type is required."

  Scenario: The fiscal year is required
    And I enter "OIP" into the annual report agency search box
    And I choose "Requests" from the data type dropdown
    And I hard click on "the View Report button"
    Then I should see "At least one Fiscal Year is required."

  Scenario: The "Select all agencies" feature show over-all numbers for all agencies
    And I click on "the Select All Agencies button"
    And I choose "Requests" from the data type dropdown
    And I check the box for the year "2020"
    And I hard click on "the download csv button"
    And I hard click on "the View Report button"
    And I wait 45 seconds
    Then I should see "Report Results"
    And I should see "Department of Justice"
    And I should see "86729"
    And I should see "Department of Transportation"
    And I should see "14632"
