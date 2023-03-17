@extlink
Feature: External Link Package

  As site visitor
  I want to make sure that the external link package is installed and working correctly
  So that an icon will appear on external links unless they are on the exclusion list

  Background:
    Given I am on "/"
    And I wait 3 seconds

  Scenario: The Hero image credit link has an icon
    Then the "the external link script" element should exist
    And I should see "_blank" in the "the Hero image credit" element
    And I should see an "the justice.gov link" element
    And I should not see "svg-icon" in the "the justice.gov link" element
