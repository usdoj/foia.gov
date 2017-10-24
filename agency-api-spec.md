# FOIA.gov Draft RESTful HTTPS API Spec

This is [a draft spec](https://github.com/18F/beta.foia.gov/issues/32) for integrating
the FOIA.gov portal with existing FOIA case management systems (_e.g._,
[FOIAonline](https://foiaonline.regulations.gov/foia/action/public/home))
operated by individual agencies in the federal government. This work stems from
the interviews and research that led to our [FOIA Portal Discovery
Recommendations](https://github.com/18F/foia-recommendations/blob/master/recommendations.md).

Once an agency's case management system supports this specification, it can
receive FOIA requests directly from the FOIA.gov portal, rather than having the
request data sent to the agency via e-mail.

To minimize agency effort, we've designed this spec so that some of
the tedious bits of implementing an API can be handled by a service like
[api.data.gov](https://api.data.gov/about/), which provides a free API
management service for federal agencies.


## Receive a FOIA Request

### Notes

This draft does not address:
* versioning
* size or rate limits
* error message/status code related to exceeded the rate limit
* any subsequent calls to the internal FOIA.gov API (to capture info needed to subsequently retrieve status, for example)
* detailed security controls


### Security controls

Once we have confidence in our data models and the touch points for
interoperability, we will be working with the security team at DOJ to ensure the
Portal meets the federal requirements for security controls. For now, we include
only some preliminary ideas based on the agency feedback we’ve received.

Each agency will be responsible for implementing security controls on their own
end as per their agency regulations and authority to operate. This may include
configuration of a web application firewall, anti-virus scanning of
file attachments, and validation of HTTP headers.


#### HTTPS

Agency endpoints should be restricted to HTTPS only with valid TLS certificates.
The Portal will validate your certificate as part of the HTTPS request.


#### Authentication

To ensure that your API and case management system aren't publicly writable, we
recommend restricting your API access to the FOIA.gov Portal. This can be done
via a shared secret HTTP header token. You will provide this secret token to the
Portal though configuration. Every request from the Portal will include this
token, and your API should validate that it is the correct token.

Services like [api.data.gov](https://api.data.gov/about/) provide this authentication for you.


### URL

There are no required parameters or format for your API URL. You may choose any
pathname you wish. If your system handles requests for multiple agency
components (common for decentralized agencies), we recommend using a URL
structure that explicitly identifies the agency component receiving the FOIA
request. Your URL should not contain any query parameters.

Recommended URL format for decentralized agencies:

    /components/:id/requests/

Where `id` is a unique identifier for a component within your agency.

For example:
* `/components/88/requests/`

But not:
* `/requests?component=88`

In addition, we recommend hosting the API on a dedicated sub-domain like `foia-api.agency.gov`. Using this kind of pathname hierarchy allows us to add additional API
endpoints for future development and features.


### Method:

  `POST`


###  URL Params

**Required:**

`id=[integer]`, where `id` is the unique identifier of the agency component that should receive the request.


### Data Params

JSON payload that contains the form fields.

    Content-Type: application/json


#### Request fields

**Field:** | `request_id`
:--- |:---
**Type:** | integer
**Description:** | A unique identifier for the request within the Portal.
**Required:** | yes
**Example:** | `1543`

**Field:** | `agency_name`
:--- |:---
**Type:** | string
**Description:** | Name of the tier 1 agency.
**Required:** | yes
**Example:** | `"Department of Justice"`

**Field:** | `agency_component_name`
:--- |:---
**Type:** | string
**Description:** | Name of the department, bureau, or office.
**Required:** | yes
**Example:** | `"Office of Information Policy"`

**Field:** | `name_first`
:--- |:---
**Type:** | string
**Description:** | First name of the requester.
**Required:** | no
**Example:** | `"George"`

**Field:** | `name_last`
:--- |:---
**Type:** | string
**Description:** | Last name of the requester.
**Required:** | no
**Example:** | `"Washington"`

**Field:** | `address_line1`
:--- |:---
**Type:** | string
**Description:** | Requester’s street mailing address.
**Required:** | no
**Example:** | `"1800 F Street"`

**Field:** | `address_line2`
:--- |:---
**Type:** | string
**Description:** | Line 2 for requester’s mailing address.
**Required:** | no
**Example:** | `"Suite 400"`

**Field:** | `address_city`
:--- |:---
**Type:** | string
**Description:** | City for requester’s mailing address.
**Required:** | no
**Example:** | `"Mount Vernon"`

**Field:** | `address_state_province`
:--- |:---
**Type:** | string
**Description:** | State or province for requester’s mailing address.
**Required:** | no
**Example:** | `"Virginia"`

**Field:** | `address_zip_postal_code`
:--- |:---
**Type:** | string
**Description:** | Zip code or postal code for requester’s mailing address.
**Required:** | no
**Example:** | `"98273"`

**Field:** | `request_description`
:--- |:---
**Type:** | string
**Description:** | Description of the records the requester is seeking.
**Required:** | yes
**Example:** | `"I am seeking records pertaining to ..."`

**Field:** | `processing_fees`
:--- |:---
**Type:** | string
**Description:** | The amount in USD that a requester is willing to pay in order to cover costs related to this request.
**Required:** | no
**Example:** | `"25.00"`

**Field:** | `request_fee_waiver`
:--- |:---
**Type:** | string
**Description:** | The requester would like to request that fees associated with the request be waived.
**Required:** | no, defaults to `"no"`
**Example:** | `"no"`

**Field:** | `request_expedited_processing`
:--- |:---
**Type:** | string
**Description:** | The requester would like this request to be processed on an expedited basis.
**Required:** | no, defaults to `"no"`
**Example:** | `"no"`

**Field:** | `company_organization`
:--- |:---
**Type:** | string
**Description:** | Name of the organization or company on which the requester is making a request on behalf of.
**Required:** | no
**Example:** | `"Newspaper Inc"`

**Field:** | `email`
:--- |:---
**Type:** | string
**Description:** | Email address of the requester.
**Required:** | yes
**Example:** | `"george.washington@example.com"`

**Field:** | `phone_number`
:--- |:---
**Type:** | string
**Description:** | Phone number of the requester.
**Required:** | no
**Example:** | `"+15551234567"`

**Field:** | `fax_number`
:--- |:---
**Type:** | string
**Description:** | Fax number of the requester.
**Required:** | no
**Example:** | `"+15551234589"`

**Field:** | `attachments_supporting_documentation`
:--- |:---
**Type:** | array<object>
**Description:** | Documents or attachments supporting the request provided by the requester. The file data is base64 encoded. Most programming languages include in their standard library a method to decode base64 messages.
**Required:** | no
**Example:** | `[{"filename": "letter.pdf", "content_type": "application/pdf", "filesize": 27556, "filedata": "YSBiYXNlNjQgZW5jb2RlZCBmaWxlCg=="}]`

**Field:** | `*`
:--- |:---
**Type:** | Determined by the [agency metadata file][agency-metadata-file-schema]. See [agency component specific form fields](#agency-component-specific-form-fields) below.
**Description:** | Agency component specific request form field as specified in your [agency's metadata file][agency-metadata-file-schema].
**Required:** | if applicable
**Example:** | See [below](#agency-form-fields-example)


##### Sample payload

```
{
    "request_id": 1534,
    "agency": "Department of Justice",
    "agency_component_name": "Office of Information Policy",
    "attachments_supporting_documentation": [
        {
            "content_type": "application/pdf",
            "filedata": "YSBiYXNlNjQgZW5jb2RlZCBmaWxlCg==",
            "filename": "letter.pdf",
            "filesize": 27556
        }
    ],
    "request_description": "I am seeking records pertaining to ...",
    "email": "george.washington@example.com",
    "request_expedited_processing": "no",
    "fax_number": "+15551234589",
    "request_fee_waiver": "no",
    "processing_fees": 25.0,
    "company_organization": "Newspaper Inc",
    "phone_number": "+15551234567",
    "address_line1": "1800 F Street",
    "address_line2": "Suite 400",
    "address_city": "Mount Vernon",
    "address_state_province": "Virginia",
    "address_country": "United States",
    "address_zip_postal_code": "98273",
    "name_first": "George",
    "name_last": "Washington"
}
```


#### Agency component specific form fields

Your agency component might have additional fields specified in your [agency
metadata file][agency-metadata-file-schema]. These additional fields are unique
to your agency and are also captured in this request payload.

These additional fields will be defined by your agency metadata file which
includes both required and optional form fields. Any fields marked `required`
will be considered required. The default is not required. The FOIA.gov portal
will ensure that required fields are present before POSTing a request to your
endpoint.

<a id="agency-form-fields-example"></a>
##### Example

Consider this sample [agency metadata
file](https://github.com/18F/beta.foia.gov/blob/master/GSA.json). A truncated version is
provided below.

```
{
    "abbreviation": "GSA",
    "components": [
        {
            // ...
            "form_fields": [
                {
                    "help_text": "If your request relates to a GSA contract, please provide the contract number (which starts with \"GS-\")",
                    "label": "GS- Contract number",
                    "name": "contract_number"
                },
                {
                    "help_text": "(i.e. New England Region (1A) - States Served: CT, MA, ME, NH, RI, VT",
                    "label": "GSA Region",
                    "name": "region"
                },
                {
                    "enum": [
                        "Company",
                        "Individual/Self",
                        "Organization"
                    ],
                    "help_text": "Company",
                    "label": "Request Origin",
                    "name": "request_origin",
                    "regs_url": null,
                    "required": true
                }
            ]
        }
    ]
}
```

Therefore, the payload has these additional fields.

- (required) `request_origin`
- `contract_number`
- `region`

So in addition to the fields in the [above request payload](#request-fields),
these fields might appear for GSA.

```
{
    "name_first": "George",
    "name_last": "Washington"
    // ... standard request fields ...

    // agency component specific fields appear within payload
    "contract_number": "5547",
    "region": "9",
    "request_origin": "Individual/Self"
}
```


### Success Response

**Code:** | 200 OK
:--- |:---
**Content:** | `{ "id" : 33, "status_tracking_number": "doj-1234" }`
**Meaning:** | Confirm that the request was created and return an `id` that can uniquely identify the request in the case management system. The (optional) status tracking number can be used by a requester to track a request.


### Error Response

**Code:** | 404 NOT FOUND
:--- |:---
**Content:** | `{ "code" : "A234", "message" : "agency component not found", "description": "description of the error that is specific to the case management system"}`
**Meaning:** | The target agency component specified in URI was not found (error payload includes a place for a system-specific message, to make it easier to track down problems)

**Code:** | 500 INTERNAL SERVER ERROR
:--- |:---
**Content:** | `{ "code" : "500", "message" : "internal error", "description": "description of the error that is specific to the case management system"}`
**Meaning:** | The case management system encountered an internal error when trying to create the FOIA request (error payload includes a place for a system-specific message, to make it easier to track down problems)


### Sample request

```
$ curl -X POST -H "Content-Type: application/json" -d @- https://foia-api.agency.gov/components/234/requests <<EOF
{
    "request_id": 1534,
    "agency": "General Services Administration",
    "agency_component_name": "General Services Administration (General)",
    "attachments_supporting_documentation": [
        {
            "content_type": "application/pdf",
            "filedata": "YSBiYXNlNjQgZW5jb2RlZCBmaWxlCg==",
            "filename": "letter.pdf",
            "filesize": 27556
        }
    ],
    "contract_number": "5547",
    "request_description": "I am seeking records pertaining to ...",
    "email": "george.washington@example.com",
    "request_expedited_processing": "no",
    "fax_number": "+15551234589",
    "request_fee_waiver": false,
    "processing_fees": 25.0,
    "company_organization": "Newspaper Inc",
    "phone_number": "+15551234567",
    "region": "9",
    "request_origin": "Individual/Self",
    "address_line1": "1800 F Street",
    "address_line2": "Suite 400",
    "address_city": "Mount Vernon",
    "address_state_province": "Virginia",
    "address_zip_postal_code": "98273",
    "name_first": "George",
    "name_last": "Washington"
}
EOF
```

[agency-metadata-file-schema]: https://github.com/18F/foia-recommendations/blob/master/schemas.md#agency-metadata-file
