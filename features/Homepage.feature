@homepage
Feature: Homepage

  As site visitor
  I need the correct experience on the homepage
  So that I can continue browsing into the site

  Background:
    Given I am on the homepage
    And I wait 25 seconds

  Scenario: The introduction banner appears on the page
    Then I should see "The basic function of the Freedom of Information Act"
