@report
Feature: Quartersly report

  As site visitor
  I need to be able to run quarterly reports of agency FOIA data
  So that I can learn how the agencies are doing with the FOIA

  Background:
    Given I am on "/quarterly.html"
    And I wait 15 seconds

  Scenario: The input sections are visible
    Then I should see "Create a Quarterly Report"
    And I should see "1. Select Agencies or Components"
    And I should see "2. Select Data Type(s)"
    And I should see "3. Select Fiscal Years"
    And I should see "4. Select Quarters"
    And I should see "View Report"
    And I should see "Download CSV"
    And I should see "Apple"

