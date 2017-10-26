---
data:
  abbreviation: GSA
  name: General Services Administration
  components:
  - name: General Services Administration
    reading_rooms:
    - https://www.gsa.gov/portal/content/305477
    submission_methods:
    - submission_format: paper
      name: FOIA Contact
      title: FOIA Requester Service Center (H1C)
      address_lines:
      - Room 7308
      - 1800 F. Street, NW
      - Washington, DC 20405
    - submission_format: email
      email: GSA.FOIA@gsa.gov
    - submission_format: web
      url: https://foiaonline.regulations.gov/foia/action/public/home
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
    - name: request_fee_waiver
      label: Request fee waiver
      type: radio
    - name: request_expedited_processing
      label: Request expedited processing
      type: radio
    - name: attachement
      label: Attachments / supporting documentation
      type: file

      # agency component specific fields
    - name: request_origin
      label: Request Origin
      regs_url: null
      help_text: Company
      required: true
      enum:
      - Company
      - Individual/Self
      - Organization
    - name: contract_number
      label: GS- Contract number
      help_text: If your request relates to a GSA contract, please provide the contract number (which starts with "GS-")
    - name: region
      label: GSA Region
      help_text: "i.e. New England Region (1A) - States Served: CT, MA, ME, NH, RI, VT"
  - name: Office of Inspector General
    reading_rooms:
    - https://www.gsa.gov/portal/content/305477
    submission_methods:
      - submission_format: paper
        name: OIG Freedom of Information Act Officer
        title: GSA, Office of Inspector General (JC)
        address_lines:
        - 1800 F Street, NW, Room 5326
        - Washington, DC 20405
      - submission_format: fax
        fax: +12025010414
      - submission_format: email
        email: OIGFOIA-PrivacyAct@gsaig.gov
    form_fields:
    - name: request_origin
      label: Request Origin
      regs_url: null
      help_text: Company
      required: true
      enum:
      - Company
      - Individual/Self
      - Organization
    - name: contract_number
      label: GS- Contract number
      help_text: If your request relates to a GSA contract, please provide the contract number (which starts with "GS-")
    - name: region
      label: GSA Region
      help_text: "(i.e. New England Region (1A) - States Served: CT, MA, ME, NH, RI, VT"
---
