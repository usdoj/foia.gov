---
title: Developer resources
layout: default
use-uswds: true
grid: usa-grid
permalink: /developer/
bundle: contact_download
---
# Developer resources


## FOIA API

The FOIA request Portal is powered by an API. This API is available to the
public. In order to use the API, you must [signup](https://api.data.gov/signup/) for an API key.


### Agency components

Agencies of the federal government submit information about their FOIA process
in a machine-readable format to the Portal. This information is availble through
the Agency component API. This API follows the [JSON API](http://jsonapi.org/)
standard and leverages the [Drupal JSON API
module](https://www.drupal.org/docs/8/modules/json-api). The
[documentation](https://www.drupal.org/docs/8/modules/json-api) for the JSON API
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


## The FOIA XML Schema

  <p>Federal agencies publish FOIA information   in accordance with guidelines prepared by the U. S. Department of Justice   Office of Information Policy. These guidelines, available <a href="http://www.justice.gov/oip/foiapost/guidance-annualreport-052008.pdf" target="_blank">here</a>,   describe the format and meaning of FOIA annual report information. In   addition, a <em>FOIA Annual Report XML schema</em> has been developed   allowing agency FOIA annual report information to be represented and   exchanged in a standardized format. This XML schema closely follows   the structure and terminology of the guidance document, and conforms   to the NIEM standard (<a href="http://niem.gov" target="_blank">http://niem.gov</a>).&nbsp;</p>
  <p>All agency data available through reports and graphs on the <a href="{{ site.baseurl }}/data.html">FOIA.gov</a> website is also available  for public download as XML documents conforming to the FOIA Annual Report XML schema at the link below. This enables any kind of  offline processing, storage, comparison, or mashup which may be desired.&nbsp;&nbsp; </p>
  <p>The entire IEPD package may also be downloaded directly by clicking on the following link [<a href="{{ site.baseurl }}/iepd/FOIA_Annual_Report_v2.2.zip">Download IEPD</a>].</p>
  <p>Within this IEPD package you can find the XML schema defined in <em>exchange_files/schema/extension/FoiaAnnualReportExtensions.xsd</em>. Note that this definition inherits from others, which can be found in the package as well, under <em>exchange_files/schema/Subset/niem/</em>.</p>
  <h3>FOIA Data Set Downloads</h3>
  <p>The following compressed files are complete archives of the  FOIA Data sets for the years 2008 through 2018.</p>
  <ul>
    <li><a href="{{ site.baseurl }}/2018-FOIASetFull.zip">Download the full 2018 FOIA Data set</a> (.zip format)</li>
    <li><a href="{{ site.baseurl }}/2017-FOIASetFull.zip">Download the full 2017 FOIA Data set</a> (.zip format)</li>
    <li><a href="{{ site.baseurl }}/2016-FOIASetFull.zip">Download the full 2016 FOIA Data set</a> (.zip format)</li>
    <li><a href="{{ site.baseurl }}/2015-FOIASetFull.zip">Download the full 2015 FOIA Data set</a> (.zip format)</li>
    <li><a href="{{ site.baseurl }}/2014-FOIASetFull.zip">Download the full 2014 FOIA Data set</a> (.zip format)</li>
    <li><a href="{{ site.baseurl }}/2013-FOIASetFull.zip">Download the full 2013 FOIA Data set</a> (.zip format)</li>
    <li><a href="{{ site.baseurl }}/2012-FOIASetFull.zip">Download the full 2012 FOIA Data set</a> (.zip format)</li>
    <li><a href="{{ site.baseurl }}/2011-FOIASetFull.zip">Download the full 2011 FOIA Data set</a> (.zip format)</li>
    <li><a href="{{ site.baseurl }}/2010-FOIASetFull.zip">Download the full 2010 FOIA Data set</a> (.zip format)</li>
    <li><a href="{{ site.baseurl }}/2009-FOIASetFull.zip">Download the full 2009 FOIA Data set</a> (.zip format)</li>
    <li><a href="{{ site.baseurl }}/2008-FOIASetFull.zip">Download the full 2008 FOIA Data set</a> (.zip format)</li>
  </ul>


## Agency resources

If your agency is interested in receiving requests from the Portal via an API, please check out
our [API spec](/developer/agency-api/) and [get in touch with us](mailto:{{ site.email }}).

## FOIA Contacts Download

The following file is the complete listing of all FOIA contacts across federal departments and agencies.

<div id="contact-download-react-app"></div>

<p align="right"><a href="#top">Return to Top</a></p>
