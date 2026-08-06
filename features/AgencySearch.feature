@agencysearch
Feature: Agency Search

  As site visitor
  I need to be able to search for an agency
  So that I can find a particular agency

  Background:
    Given I am on "/agency-search.html"
    And I wait 60 seconds

  Scenario: The sorting works to show the most popular components first
    Then I should see "Department of Homeland Security"

  Scenario: The agency type-ahead works
    Then I should see "Search an agency name or keyword"
    And I enter "EPA" into the agency search box
    And I wait 1 second
    Then I should see "Environmental Protection Agency"
    And I hard click on "the first agency suggestion"
    And I wait 5 seconds
    Then I should see "The mission of EPA is to protect human health and the environment."
