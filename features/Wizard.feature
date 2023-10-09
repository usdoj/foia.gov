@wizard
Feature: wizard

  As a site visitor
  I need to use the wizard
  So that I can be guided to the appropriate agency or information

  Background:
    Given I am on "/wizard.html"
    And I wait 10 seconds

  Scenario: The Wizard loads successfully
    Then I should see "Hello,"
    And I should see "The government hosts a vast amount of information,"
    And I hard click on "the wizard primary button"
    And I wait 1 second
    Then I should see "Let's dive in..."

  Scenario: The tax records journey can be navigated
    Then I hard click on "the wizard primary button"
    Then I wait 5 second
    Then the "the wizard primary button" element should not exist
    Then I hard click on "the Tax records topic button"
    Then the "the wizard primary button" element should exist
    Then I hard click on "the wizard primary button"
    And I wait 5 seconds
    Then I should see "Are you seeking your own records?"
    And I select the radio option for the answer "Yes"
    And I hard click on "the wizard primary button"
    And I wait 1 second
    Then I should see "Okay, you’re looking for:"
    And I should see "Your own tax records"
    And I hard click on "the wizard primary button"
    And I wait 1 second
    Then I select the radio option for the answer "Copy or transcript of tax return"
    And I hard click on "the wizard primary button"
    And I wait 1 second
    Then I should see "Visit the Internal Revenue Service (IRS) website to obtain routine access to frequently requested IRS records without needing to file a FOIA request."
    And I should see 1 "external link card" element
    And I should see "Can we help you with anything else?"
    Then I select the radio option for the answer "Yes, I would like to do another search."
    And I hard click on "the wizard primary button"
    And I wait 1 second

  Scenario: A user query can be submitted and results are returned
    Then I hard click on "the wizard primary button"
    Then I wait 1 second
    Then the "wizard primary button" element should not exist
    Then I enter "John Lewis Voting Rights Act" into the wizard query box
    Then the "the wizard primary button" element should exist
    And I hard click on "the wizard primary button"
    And I wait 5 seconds
    Then I should see "Okay, you’re looking for:"
    And I should see "John Lewis Voting Rights Act"
    And I should see "We found the following public information:"
    And the "external link card" element should exist
    And I should see "If the information above is not what you're looking for, the following agencies may have it."
    And I should see "Can we help you with anything else?"
