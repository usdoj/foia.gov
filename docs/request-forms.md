# Request forms

This application (the NFP) takes "webforms" from the Drupal back-end and then renders
them on the page using front-end code. Normally, Drupal renders webforms
directly, but in the decoupled architecture of the NFP, the webforms are
passed from the back-end to the front-end as JSON data, and that JSON is then
converted into a form. So, this architecture relies on communication and
conversion between two libraries:

1. [The Drupal "Webform" module](https://www.drupal.org/project/webform)
2. [The React JSON Schema Forms (RJSF) library](https://rjsf-team.github.io/react-jsonschema-form/docs/)

## Communication

Content in the Drupal back-end is communicated to the front-end via
Drupal's JSONAPI service. As such, the front-end makes a request to the
back-end to retrieve a JSON response that details the configuration of each
individual webform.

## Conversion

The configuration of the webform must then be converted into the data structures
needed by RJSF. This conversion is done in the webform_to_json_schema.js file.

## Supported features

The Webform module and the RJSF library but have large feature sets, but in
general the Webform module has more features. In addition, each feature must
be intentionally converted (as mentioned above) which means that we need custom
code to support any given feature of the Webform module.

This means that there are things you can configure in a Drupal webform that will
NOT survive the conversion to RJSF. For example, at the time of this writing,
webform elements can be configured to be "radio buttons", but our conversion
code does not correctly support this feature, and so they will appear on the
front-end as a drop-down. (Though this is a desired feature that we're working
on.)

Here is a current list of the supported features -- ie, things you can do in
the Webform module that will convert to RJSF in the expected way:

### Supported elements

These are the "elements" in Webform that will appear as expected in RJSF:

* Text field
* Email
* Telephone
* Select
* Text area
* File (see below)

Note that the file element is a special case. Currently a single file element is
supported but additional file elements cannot be added.

### Conditions

In the Webform module it is possible to set "conditions" on elements, so that
their behavior can depend on user input in other elements. These are partially
supported, as detailed below:

#### "Require" condition

The most commonly-used conditional is making a field required based on the input
in other elements. This is supported in two ways: by a "required" label
appearing dynamically on the appropriate form elements, and by the return of
error messages after form submission.

1. "Required" label appearing dynamically: This is the best user experience,
because the "Required" label makes it immediately clear to the user what is
required, and because it will not even let the user submit the form until the
input is provided. However, this method is only supported when the webform
"condition" uses a logic operator of "any" and a trigger of "value is". Also,
this method only works on custom fields (fields that are not part of the
starting webform "template").
2. Return of error messages after form submission: If a condition is setup to
make a field required, it will always result in error messages when required
input is missing. This is a slightly worse user experience, because the user
will not be aware that the field is required until after they have attempted
to submit the form. Because this is a worse user experience, it is recommended
to always use a logic operator of "any" and a trigger of "value is", so that
the dynamic label (described above) will appear as well.

#### "Visible" condition

Sometimes there are fields that are optional, and would ideally be visible under
only certain circumstances. This is partially supported. However, it is similar
to the dynamic "required" labels: it will work only if the logic operator is
"any" and the trigger is "value is", and it only works on custom fields (fields
that are not part of the starting webform "template").

#### Other conditions

No other conditions are supported at this time.

## Element positioning and custom fields

Each webform has a core set of fields that appear in a particular order on
the front-end. This order cannot currently be customized. Additional custom
fields can be added to webforms, but they will always appear in the "Additional
information" section.
