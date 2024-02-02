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

## The FOIA XML Schema

  <p>Federal agencies publish FOIA information   in accordance with guidelines prepared by the U. S. Department of Justice   Office of Information Policy. These guidelines, available <a href="http://www.justice.gov/oip/foiapost/guidance-annualreport-052008.pdf" target="_blank">here</a>,   describe the format and meaning of FOIA annual report information. In   addition, a <em>FOIA Annual Report XML schema</em> has been developed   allowing agency FOIA annual report information to be represented and   exchanged in a standardized format. This XML schema closely follows   the structure and terminology of the guidance document, and conforms   to the NIEM standard (<a href="http://niem.gov" target="_blank">http://niem.gov</a>).&nbsp;</p>
  <p>All agency data available through reports and graphs on the <a href="{{ site.baseurl }}/data.html">FOIA.gov</a> website is also available  for public download as XML documents conforming to the FOIA Annual Report XML schema at the link below. This enables any kind of  offline processing, storage, comparison, or mashup which may be desired.&nbsp;&nbsp; </p>
  <p>The entire IEPD package may also be downloaded directly by clicking on the following link [<a href="{{ site.baseurl }}/iepd/FOIA_Annual_Report_v2.2.zip">Download IEPD</a>].</p>
  <p>Within this IEPD package you can find the XML schema defined in <em>exchange_files/schema/extension/FoiaAnnualReportExtensions.xsd</em>. Note that this definition inherits from others, which can be found in the package as well, under <em>exchange_files/schema/Subset/niem/</em>.</p>
  <p>You can download the <a href="{{ site.baseurl }}/foia-dataset-download.html">FOIA Data Set here</a>.</p>  

### Annual Report XML API

Individual annual reports, in XML format, are available via an API endpoint:

`/api/annual-report-xml/[agency abbreviation]/[year]`

For example, to receive the Department of Justice (DOJ) annual report for 2021, you could use this:

`curl -H 'X-API-Key: <your-api-key>' https://api.foia.gov/api/annual-report-xml/DOJ/2021`

## API Key Signup

{% include api-key-signup-form.html %}
