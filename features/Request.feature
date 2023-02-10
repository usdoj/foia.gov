@request
Feature: Request

  As site visitor
  I need to submit FOIA requests
  So that I can get government information

  Background:
    Given I am on "/request/agency-component/8216158f-8089-431d-b866-dc334e8d4758/"
    And I wait 5 seconds

  Scenario: The 6 sections of the request are visible
    Then I should see "Contact information"
    And I should see "Your request"
    And I should see "Additional information"
    And I should see "Fees"
    And I should see "Request expedited processing"
    And I should see "Review and submit"

  Scenario: The section descriptions are visible
    Then I should see "This information is needed so the agency knows"
    And I should see "The description of the records you are requesting"
    And I should see "If you are submitting a request for records"
    And I should see "Most FOIA requests do not involve any fees"
    And I should see "Agencies generally process requests on a first-in"
    And I should see "Please review the information you entered above"

  Scenario: The field labels are visible
    Then I should see "First name"
    And I should see "Last name"
    And I should see "Your organization"
    And I should see "Email address"
    And I should see "Phone number"
    And I should see "Fax number"
    And I should see "Mailing address 1"
    And I should see "Mailing address 2"
    And I should see "City"
    And I should see "State or province"
    And I should see "Zip or postal code"
    And I should see "Country"
    And I should see "Your request"
    And I should see "Upload additional documentation"
    And I should see "What type of requester are you?"
    And I should see "Fee waiver"
    And I should see "Fee waiver justification"
    And I should see "The amount of money you’re willing to pay in fees, if any"
    And I should see "Expedited processing"
    And I should see "Justification for expedited processing"
