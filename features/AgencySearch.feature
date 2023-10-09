@agencysearch
Feature: Agency Search

  As site visitor
  I need to be able to search for an agency
  So that I can find a particular agency

  Background:
    Given I am on "/agency-search.html"
    And I wait 10 seconds

  Scenario: The agency type-ahead works
    Then I should see "Search an agency name or keyword"
    And I enter "ENV" into the agency search box
    And I wait 1 second
    Then I should see "Council on Environmental Quality"
    And I hard click on "the first agency suggestion"
    And I wait 5 seconds
    Then I should see "The Council on Environmental Quality oversees NEPA implementation"
