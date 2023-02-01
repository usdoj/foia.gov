@cfotech
Feature: Technology Committee

  As site visitor
  I need to make sure the data from the Drupal admin is working
  So that I can view the content and accordion

  Background:
    Given I am on "/chief-foia-officers-council/committee/technology-committee"
    And I wait 20 seconds

  Scenario: The headers are visible
    Then I should see "Technology Committee"
    And I should see "Working Groups"
    And I should see "Inactive Working Groups"

  Scenario: The Technology Committee accordion should expand
    And I click on "the Technology Committee accordion"
    And I wait 2 seconds
    Then I should see "Charter"
