@homepage
Feature: Homepage

  As site visitor
  I need the correct experience on the homepage
  So that I can continue browsing into the site

  Background:
    Given I am on the homepage
    And I wait 5 seconds

  Scenario: The introduction banner appears on the page
    Then I should see "The basic function of the Freedom of Information Act"

  Scenario: The agency type-ahead works
    Then I should see "Search" in the "homepage search button" element
    And I enter "OIP" into the homepage agency search box
    Then I should see "In addition to its policy functions, OIP oversees agency compliance with the FOIA."

  Scenario: The agency a-to-z list works
    And I click on "the A-to-Z button"
    And I click on "the A button"
    And I click on "the last item in the A section"
    And I wait 5 seconds
    Then I should see "a premier retirement community with exceptional residential care"