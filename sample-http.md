# FOIA.gov RESTful HTTPS API Spec

This is [a draft spec](https://github.com/18F/foia/issues/32) for integrating the FOIA.gov portal with existing FOIA case management systems (_e.g._, [FOIAonline](https://foiaonline.regulations.gov/foia/action/public/home))in the federal government.

Once a case management system supports this specification, it can receive FOIA requests directly from the FOIA.gov portal, rather than having the request data first sent via e-mail.

**Make FOIA Request**
----

* **URL**

  `/components/:id/requests/`

* **Method:**

  `POST`

*  **URL Params**

   **Required:**

   `id=[integer]`, where `id` is the unique identifier of the agency component that should receive the request

* **Data Params**

  JSON payload that contains the form fields

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ id : 33 }`
    **Meaning:**
    confirm that the request was created and return an `id` that can uniquely identify the request in the case management system


* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ "code" : "A234", "message" : "agency component not found", "description": "description of the error that is specific to the case management system"}`
    **Meaning:**
    the target agency component specified in URI was not found (error payload includes a place for a system-specific message, to make it easier to track down problems)

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ "code" : "500", "message" : "internal error", "description": "description of the error that is specific to the case management system"}`
    **Meaning:**
    the case management system encountered an internal error when trying to create the FOIA request (error payload includes a place for a system-specific message, to make it easier to track down problems)


* **Sample Call:**

      CURL -X POST -H "Content-Type: application/json" -d '{allthejsonstuff}' https://api.foia.gov/components/234/requests

* **Notes:**

  I went back and forth on how to specific the agency component intended to receive the request. From a RESTful API design perspective, I like having the agency component as a resource. That said, it might make more sense to send this information as part of the request payload, with all of the other information.

  This draft does not address:
  * versioning
  * error message/status code related to exceeded the rate limit
  * any subsequent calls to internal the internal FOIA.gov API (to capture info needed to subsequently retrieve status, for example)
