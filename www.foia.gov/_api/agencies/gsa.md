---
data:
  abbreviation: GSA
  name: General Services Administration
  departments:
  - name: General Services Administration (General)
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
    required_form_fields:
    - name: request_origin
      label: Request Origin
      regs_url: null
      help_text: Company
      enum:
      - Company
      - Individual/Self
      - Organization
    additional_form_fields:
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
    required_form_fields:
    - name: request_origin
      label: Request Origin
      regs_url: null
      help_text: Company
      enum:
      - Company
      - Individual/Self
      - Organization
    additional_form_fields:
    - name: contract_number
      label: GS- Contract number
      help_text: If your request relates to a GSA contract, please provide the contract number (which starts with "GS-")
    - name: region
      label: GSA Region
      help_text: "(i.e. New England Region (1A) - States Served: CT, MA, ME, NH, RI, VT"
---
