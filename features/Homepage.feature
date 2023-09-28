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

  Scenario: The "Start your journey" CTA appears on the page
    Then I should see "Start your FOIA journey"
    And I should see "Learn about the FOIA process"
    And I should see "Use our search tool"
    And I should see "Start a request with a specific agency"
