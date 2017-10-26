---
data:
  abbreviation: OGE
  name: Office of Government Ethics
  components:
  - name: Office of Government Ethics
    reading_rooms:
    - https://www.oge.gov/Web/OGE.nsf/Resources/Electronic+Reading+Room
    submission_methods:
    - submission_format: paper
      name: Rachel K. Dowell
      title: OGE FOIA Officer
      address_lines:
      - Suite 500
      - 1201 New York Avenue, NW
      - Washington, DC 20005-3917
    - submission_format: fax
      fax: +12024829237
    - submission_format: email
      email: usoge@oge.gov
    form_fields:
    - name: first_name
      label: First name
    - name: last_name
      label: Last name
    - name: organization
      label: Organization
    - name: email
      label: Email address
      type: email
      example: you@example.com
    - name: phone
      label: Phone number
      type: tel
    - name: fax
      label: Fax number
      type: tel
    - name: address1
      label: Street address 1
    - name: address2
      label: Street address 2
    - name: city
      label: City
    - name: state
      label: State
    - name: zip
      label: Zipcode
    - name: fee_willing_amount
      label: Processing fees
      help_text: What amount in fees are you willing to pay for this request?
      example: 25
    - name: delivery_method
      label: Delivery method
      help_text: How would you like to receive your responsive documents?
      enum:
      - Electronic
      - Paper
    - name: description
      label: Request description
      type: textarea
      required: true
    - name: fee_waiver
      label: Request fee waiver
      type: checkbox
    - name: expedited_processing
      label: Request expedited processing
      type: checkbox
    - name: attachement
      label: Attachments / supporting documentation
      type: file

      # agency component specific fields
    - name: ethics_460_case_number
      label: Ethics form 460A case number
      help_text: If you've filed a 460A, please include the case number
---
