@report
Feature: Annual report

  As site visitor
  I need to be able to run reports of agency FOIA data
  So that I can learn how the agencies are doing with the FOIA

  Background:
    Given I am on "/data.html"
    And I wait 5 seconds

  Scenario: The input sections are visible
    Then I should see "Create a Report"
    And I should see "1. Select Agencies or Components"
    And I should see "2. Select Data Type(s)"
    And I should see "3. Select Fiscal Years"
    And I should see "View Report"
    And I should see "Download CSV"

  Scenario: The agency type-ahead works
    And I enter "OIP" into the annual report agency search box
    And I select "Requests" from "Data Type"
    And I check the year "2020"
    And I take a screenshot