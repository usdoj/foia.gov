@cfocommittee
Feature: Committee on Cross-Agency Collaboration and Innovation

  As site visitor
  I need to make sure the Committee API from Drupal admin is working
  So that I can make sure there is at least one Working Group

  Background:
    Given I am on "/chief-foia-officers-council/committee/cross-agency-collaboration-innovation"
    And I wait 20 seconds

  Scenario: The headers are visible
    Then I should see "Committee on Cross-Agency Collaboration and Innovation"
    And I should see "Working Groups"
