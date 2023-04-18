@quarterlydownload
Feature: Quarterly download report

  As site visitor
  I need to be able to download quarterly report files

  Background:
    Given I am on "/quarterly.html"
    And I wait 20 seconds

  Scenario: The input sections are visible
    Then I should see "Create a Quarterly Report"
    And I should see "1. Select Agencies or Components"
    And I should see "2. Select Data Type(s)"
    And I should see "3. Select Fiscal Years"
    And I should see "4. Select Quarters"
    And I hard click on "the download csv button"
    And I should see "View Report"
    And I should see "Download CSV"
    And I hard click on "the download csv button"
