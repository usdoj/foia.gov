---
title: Developer resources
layout: default
use-uswds: true
grid: usa-grid
permalink: /developer/
bundle: contact_download
---
# Developer Resources

The FOIA request Portal is powered by a public API.  In order to use the API, you must [signup for an API key here](#api-key-signup).
Visit the [Swagger page](/swagger.html) to view the structure of the FOIA API.

If your agency is interested in receiving requests from the Portal via an API, please check out
our [Agency API spec](/developer/agency-api/) and [get in touch with us](mailto:{{ site.email }}).

### Agency Components

Agencies of the federal government submit information about their FOIA process
in a machine-readable format to the Portal. This information is available through
the Agency component API. This API follows the [JSON API](http://jsonapi.org/)
standard and leverages the [Drupal JSON API
module](https://www.drupal.org/docs/8/modules/json-api). The
[documentation](https://www.drupal.org/docs/core-modules-and-themes/core-modules/jsonapi-module) for the JSON API
module is a great resource.

The endpoint for the Agency component API.

    https://api.foia.gov/api/agency_components

An agency component payload might look like
[this](https://github.com/18F/beta.foia.gov/tree/develop/www.foia.gov/_data/agency_components/oip.json).


#### Examples

Request a list of agency components names.

```
curl -g -v -H 'X-API-Key: <your-api-key>' 'https://api.foia.gov/api/agency_components?&fields[agency_component]=title'
```

Fetch a list of agency components with their parent agency.

```
curl -g -v -H 'X-API-Key: <your-api-key>' 'https://api.foia.gov/api/agency_components?&include=agency&fields[agency]=name,abbreviation&fields[agency_component]=title,abbreviation,agency'
```

Fetch the Office of Information Policy.

```
curl -g -v -H 'X-API-Key: <your-api-key>' 'https://api.foia.gov/api/agency_components/8216158f-8089-431d-b866-dc334e8d4758?'
```

Fetch the Office of Information Policy’s FOIA request form.

```
curl -g -v -H 'X-API-Key: <your-api-key>' https://api.foia.gov/api/agency_components/8216158f-8089-431d-b866-dc334e8d4758/request_form
```


### Submission

You can submit a FOIA request using our API. The endpoint for the submission API:

    https://api.foia.gov/api/webform/submit

You'll need to identify the request form you are submitting to using the Agency
component API and provide any relevant data to Agency.

Get the Office of Information Policy's form id.

```
$ curl -H 'X-API-Key: <your-api-key>' https://api.foia.gov/api/agency_components/8216158f-8089-431d-b866-dc334e8d4758/request_form | jq '.data.attributes.id'
"test_form"
```

Note that each agency may require different information based on their
regulations. You can see what information is being requested by looking at
their webform `elements`. Check the element’s properties to determine which
fields are required.

```
$ curl -H 'X-API-Key: <your-api-key>' https://api.foia.gov/api/agency_components/8216158f-8089-431d-b866-dc334e8d4758/request_form | jq '.data.attributes.elements | keys'
[
  "address_city",
  "address_country",
  "address_line1",
  "address_line2",
  "address_state_province",
  "address_zip_postal_code",
  "attachments_supporting_documentation",
  "company_organization",
  "email",
  "expedited_processing",
  "expedited_processing_explanation",
  "fax_number",
  "fee_amount_willing",
  "fee_waiver",
  "fee_waiver_explanation",
  "name_first",
  "name_last",
  "phone_number",
  "request_category",
  "request_description"
]
```

Submit a request to the Office of Information Policy.

```
curl -v -H 'X-Api-Key: <your-api-key>' -H 'Content-Type: application/json' https://api.foia.gov/api/webform/submit --data-binary @- <<EOF
{
    "id": "test_form",
    "email": "george@example.com",
    "name_first": "George",
    "name_last": "Washington",
    "request_description": "A very specific description of records."
}
EOF
```

### Annual Report XML API

Individual annual reports, in XML format, are available via an API endpoint:

`/api/annual-report-xml/[agency abbreviation]/[year]`

For example, to receive the Department of Justice (DOJ) annual report for 2021, you could use this:

`curl -H 'X-API-Key: <your-api-key>' https://api.foia.gov/api/annual-report-xml/DOJ/2021`

## API Key Signup

{% include api-key-signup-form.html %}

<p class="float-right"><a href="#top">Return to Top</a></p>
