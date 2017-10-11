var Glossary = require('glossary-panel');

// JSON file of terms and definitions
// TODO: Move this to an external JSON file
var terms = [
    {
      "term": "agency component",
      "definition": "A thing that receives a FOIA request. This is a catch-all term used by OIP to refer to departments, bureaus, and offices that receive FOIA requests."
    },
    {
      "term": "Chief FOIA Officer",
      "definition": "The person with agency-wide responsibility for oversight and support to FOIA programs. The position is required by the Freedom of Information Act and includes several additional responsibilities."
    },
    {
      "term": "case management system",
      "definition": "A system (usually electronic) to track the workflow of individual FOIA requests (cases). Each agency can have their own case management system they use to triage, assign, track, and fulfill requests. Agencies may use case management systems for as much or as little of the FOIA fulfillment process as they wish."
    },
    {
      "term": "disclosability",
      "definition": "The degree to which a piece of information is disclosable. Often used when evaluating what information in a record is disclosable or what must be redacted."
    }
  ];

// Optional configurion objects
var selectors = {};
var classes = {};

new Glossary(terms, selectors, classes);
