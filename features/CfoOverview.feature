@cfooverview
Feature: Chief FOIA Officers Council

  As site visitor
  I need to make sure the Chief FOIA Officers Council data is being pulled from drupal
  So that I can make sure there is at least one item in past meetings

  Background:
    Given I am on "/chief-foia-officers-council/"
    And I wait 25 seconds

  Scenario: The headers are visible
    Then I should see "Chief FOIA Officers Council"
    And I should see "PAST MEETINGS:"
