Feature: Homepage

  As site visitor
  I need the correct experience on the homepage
  So that I can continue browsing into the site

  Background:
    Given I am on "/#agency-search"
    And I wait 5 seconds

  Scenario: The introduction banner appears on the page
    Then I should see "The basic function of the Freedom of Information Act"

  Scenario: The agency type-ahead works
    Then I should see "Search" in the "homepage search button" element
    And I send key "f" in "the homepage search box" element
    And I send key "Enter" in "the homepage search box" element
    Then I should see "Armed Forces Retirement Home"

  Scenario: The agency a-to-z list works
    And I click on "the A-to-Z button"
    And I click on "the A button"
    Then I should see "Armed Forces Retirement Home"
