# FOIA.gov Draft RESTful HTTPS API Spec

This is [a draft spec](https://github.com/18F/foia/issues/32) for integrating
the FOIA.gov portal with existing FOIA case management systems (_e.g._,
[FOIAonline](https://foiaonline.regulations.gov/foia/action/public/home))in the
federal government. The work is based on our initial
[discovery and interviews](https://github.com/18F/foia-recommendations/blob/master/schemas.md#creating-a-request).

Once a case management system supports this specification, it can receive FOIA
requests directly from the FOIA.gov portal, rather than having the request data
first sent via e-mail.

In an effort to keep requirements low, we've designed this spec so that some of
the tedious bits of implementing an API can be managed by a service like
[api.data.gov](https://api.data.gov/about/). api.data.gov provides a free API
management service for federal agencies.


## Make FOIA Request

### Notes

This draft does not address:
* versioning
* size or rate limits
* error message/status code related to exceeded the rate limit
* any subsequent calls to the internal FOIA.gov API (to capture info needed to subsequently retrieve status, for example)


### URL

You may choose any pathname you wish. If your system handles requests for
multiple agency components (like a decentralized agency), we recommend using
a URL that allows for the component ID as a parameter. Your URL should not
contain any query parameters.

    /components/:id/requests/

Hosting the API on a dedicated sub-domain like `foia-api.agency.gov` is
suggested. Using this kind of pathname hierarchy allows us to add additional API
endpoints for future development and features.


### Method:

  `POST`


###  URL Params

**Required:**

`id=[integer]`, where `id` is the unique identifier of the agency component that should receive the request.


### Data Params

JSON payload that contains the form fields.


#### Request fields

**Field:** | `agency_name`
:--- |:---
**Type:** | text
**Description:** | Name of the tier 1 agency.
**Required:** | yes
**Example:** | `"Department of Justice"`

**Field:** | `agency_component_name`
:--- |:---
**Type:** | text
**Description:** | Name of the department, bureau, or office.
**Required:** | yes
**Example:** | `"Office of Information Policy"`

**Field:** | `requester_name`
:--- |:---
**Type:** | object
**Description:** | Full name of the requester.
**Required:** | yes
**Example:** | `{"first": "George", "last": "Washington"}`

**Field:** | `requester_address`
:--- |:---
**Type:** | object
**Description:** | Mailing address of the requester.
**Required:** | yes
**Example:** | `{"address1": "1800 F Street", "address2": "Suite 400", "city": "Mount Vernon", "state": "Virginia", "zip": "98273"}`

**Field:** | `description`
:--- |:---
**Type:** | text
**Description:** | Description of the records the requester is seeking.
**Required:** | yes
**Example:** | `"I am seeking records pertaining to ..."`

**Field:** | `max_fee`
:--- |:---
**Type:** | money
**Description:** | The amount in USD that a requester is willing to pay in order to cover costs related to this request.
**Required:** | no
**Example:** | `25.00`

**Field:** | `fee_waiver`
:--- |:---
**Type:** | boolean
**Description:** | The requester would like to request that fees associated with the request be waived.
**Required:** | no, defaults to `false`
**Example:** | `false`

**Field:** | `expedited`
:--- |:---
**Type:** | boolean
**Description:** | The requester would like this request to be processed on an expedited basis.
**Required:** | no, defaults to `false`
**Example:** | `false`

**Field:** | `organization`
:--- |:---
**Type:** | text
**Description:** | Name of the organization or company on which the requester is making a request on behalf of.
**Required:** | no
**Example:** | `"Newspaper Inc"`

**Field:** | `email`
:--- |:---
**Type:** | text
**Description:** | Email address of the requester.
**Required:** | yes
**Example:** | `"george.washington@example.com"`

**Field:** | `phone`
:--- |:---
**Type:** | text
**Description:** | Phone number of the requester.
**Required:** | no
**Example:** | `"+15551234567"`

**Field:** | `fax`
:--- |:---
**Type:** | text
**Description:** | Fax number of the requester.
**Required:** | no
**Example:** | `"+15551234589"`

**Field:** | `attachments`
:--- |:---
**Type:** | [object]
**Description:** | Documents or attachments supporting the request provided by the requester.
**Required:** | no
**Example:** | `[{"filename": "letter.pdf", "content_type": "application/pdf", "filesize": 27556, "filedata": "YSBiYXNlNjQgZW5jb2RlZCBmaWxlCg=="}]`


### Success Response

**Code:** | 200 OK
:--- |:---
**Content:** | `{ "id" : 33, "status_tracking_number": "doj-1234" }`
**Meaning:** | Confirm that the request was created and return an `id` that can uniquely identify the request in the case management system. The (optional) status tracking number that a requester can use to track their request.


### Error Response

**Code:** 404 NOT FOUND
:--- |:---
**Content:** `{ "code" : "A234", "message" : "agency component not found", "description": "description of the error that is specific to the case management system"}`
**Meaning:**
the target agency component specified in URI was not found (error payload includes a place for a system-specific message, to make it easier to track down problems)

**Code:** 500 INTERNAL SERVER ERROR
:--- |:---
**Content:** `{ "code" : "500", "message" : "internal error", "description": "description of the error that is specific to the case management system"}`
**Meaning:**
the case management system encountered an internal error when trying to create the FOIA request (error payload includes a place for a system-specific message, to make it easier to track down problems)


### Authentication

In order to ensure your API and case management system aren't exposed to the
public, it is recommended that you restrict access to your API so that only the
portal can access it. This is done via a secret HTTP header token. You will
provide this secret token to the portal though configuration. Every request from
the portal will include this token and your API should validate that it is the
correct token.

Services like [api.data.gov](https://api.data.gov/about/) provide this
authentication for you.


### Sample Call

    $ curl -X POST -H "Content-Type: application/json" -d '{allthejsonstuff}' https://api.foia.gov/components/234/requests
