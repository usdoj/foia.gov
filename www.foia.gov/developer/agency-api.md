---
layout: default
use-uswds: true
permalink: /developer/agency-api/
---
# FOIA.gov Draft RESTful HTTPS API Spec

This is [a draft spec](https://github.com/18F/beta.foia.gov/issues/32) for integrating
the FOIA.gov portal with existing FOIA case management systems
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

## Change Log

### Version 1.1.0
* Add the new field "pdf", to contain an object with file data for a PDF version of the request
* Add the new field "testing", to indicate when a request came from a non-production environment

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
token in the HTTP header `FOIA-API-SECRET`, and your API should validate that it
is the correct token.

Services like [api.data.gov](https://api.data.gov/about/) provide this
authentication for you and give you additional options.


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

    /components/88/requests/

But not:

    /requests?component=88

In addition, we recommend hosting the API on a dedicated sub-domain like `foia-api.agency.gov`. Using this kind of pathname hierarchy allows us to add additional API
endpoints for future development and features.


### Method:

  `POST`


###  URL parameters

**Required:**

`id=[integer]`, where `id` is the unique identifier of the agency component that should receive the request.


### Data parameters

JSON payload that contains the form fields.

    Content-Type: application/json


#### Request fields

{% for field in site.data.request_fields %}
  {% assign request_field = field[1] %}
  <table class="developer_request-fields">
    <thead>
      <tr><th>Field:</th><th><code>{{ request_field.name }}</code></th></tr>
    </thead>
    <tbody>
      <tr><td class="developer_request-fields-key">Type:</td><td>{{ request_field.type }}</td></tr>
      <tr><td>Description:</td><td>{{ request_field.description }}</td></tr>
      <tr><td>Required:</td><td>{{ request_field.required }}</td></tr>
      <tr><td>Example:</td><td><code>{{ request_field.example }}</code></td></tr>
    </tbody>
  </table>
{% endfor %}


##### Sample payload

```json
{% include developer/sample_payload.json %}
```


#### Agency component specific form fields

Your agency component might have additional fields that are unique to your agency and are also captured in this request payload. If you have ever received any submissions via email, then you can consult these emails to see the machine-names of each field. If you have not yet received any of these emails, simply perform a test submission on the portal and consult the email that arrives.


### Responses

Responses should be in `application/json` format and include an appropriate HTTP
status code.


#### Success Response

**Code:** | 200 OK
:--- |:---
**Content:** | `{ "id" : 33, "status_tracking_number": "doj-1234" }`
**Meaning:** | Confirm that the request was created and return an `id` that can uniquely identify the request in the case management system. The status tracking number (required) will be sent to the requester and used to track a request in your case management system.


#### Error Response

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
{% include developer/sample_payload.json %}
EOF
```

[agency-metadata-file-schema]: https://github.com/18F/foia-recommendations/blob/master/schemas.md#agency-metadata-file

### Troubleshooting request failures

Various factors may cause a request submitted on FOIA.gov to an agency via API to fail. In these instances, the National FOIA Portal Administrator will inform the agency/component of the failure, and will pass along the error message. Agencies/components will coordinate with their tracking system vendor to analyze this error message and address the problem to prevent similar failures in the future. The following list contains common error messages that may be helpful in this analysis.

Additional info on CURL errors can be found here: [libcurl - Error Codes.](https://curl.se/libcurl/c/libcurl-errors.html)

**Error message:** | API URL for the component must use the HTTPS protocol.
:--- |:---
**Meaning:** | The URL in the API configuration must be an https:// URL. Agency endpoints should be restricted to HTTPS only with valid TLS certificates. FOIA.gov will validate your certificate as part of the HTTPS request. 

**Error message:** | Exception message: cURL error 28: Connection timed out after 30,001 milliseconds
:--- |:---
**Meaning:** | Operation timeout. The specified time-out period was reached according to the conditions. FOIA.gov must receive a 200 Successful response from the tracking system within 30 seconds, otherwise it assumes the request failed to transmit and it will continue trying to send the request 5 times until it fatally fails.<br><br>Sometimes the request will actually submit and can be seen in the agency’s tracking system despite the failure on the FOIA.gov side resulting in 5 duplicate requests.<br><br>To address this, ensure that the 200 Success response is sent to FOIA.gov within 30,000 milliseconds (30 seconds). This requirement is detailed in the “Response” section of the API Specs. 

**Error message:** | Exception message: cURL error 60: SSL certificate problem: unable to get local issuer certificate (see https://curl.haxx.se/libcurl/c/libcurl-errors.html).
:--- |:---
**Error message:** | cURL error 60: SSL certificate problem: certificate has expired 
**Error message:** | cURL error 60: SSL certificate problem: unable to get local issuer certificate (see https://curl.haxx.se/libcurl/c/libcurl-errors.html).
**Meaning:** | Requests from FOIA.gov are sent over the public internet and do not have access to an agency’s private network or intranet. The SSL certificate installed on the API endpoint must use a trusted certificate authority (cannot be self-signed). The agency may need to update the certificate information.

**Error message:** | 404 Current IP Address is not allowed
:--- |:---
**Meaning:** | Agency endpoints may have an allowlist of IP addresses as a security protection. Sometimes the FOIA.gov IP address has not been added to that allowlist, the endpoint returns an error message similar to this. The appropriate fix is to add the FOIA.gov IP addresses to the allowlist. The error description should identify the IP address that needs to be added to the allowlist.

**Error message:** | Did not receive JSON response from component.
:--- |:---
**Meaning:** | This means the response sent to FOIA.gov was not in application/JSON format or was not sent at all. 

**Error message:** | API security token not matched.
:--- |:---
**Meaning:** | Agency endpoints require a secret key as a security protection. Sometimes the secret key that FOIA.gov is using does not match what is expected by the agency endpoint, and the endpoint returns an error message similar to this. The appropriate fix is to compare the expected secret key with the actual secret key to ensure that they match.

**Error message:** | Maximum request length exceeded.
:--- |:---
**Meaning:** | Some agency tracking systems may have a maximum length for fields. Some FOIA.gov request form fields have a 10,000 character limit by default. This error may also indicate that attachment fields are not set to accept files up to 20 MB by default. Confirm that the request_description, fee_waiver_explanation, and expedited_processing_reason fields in your tracking system accept up to 10,000 characters, and that attachments_supporting_documentation accept files up to 20MB. (See “Request Fields” above for parameters.)
