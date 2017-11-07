/*
 * FormSections
 *
 * Contains hard-coded form sections to split up the FOIA request form.
 */
import domify from './domify';


// Order of sections is significant, this is the order they are rendered in
// the form.
const FORM_SECTIONS = [
  {
    id: 'requester_contact',
    title: 'Contact information',
    description: `
      This information is needed so the agency knows where to send the response
      to your records request. Please note that not all of these fields are
      required.
    `,
    // Ordering is significant
    fieldNames: [
      // deprecated names refer to https://github.com/18F/beta.foia.gov/issues/188
      'name_prefix_title', // deprecated
      'prefix_title', // deprecated
      'name_first',
      'first_name', // deprecated
      'name_middle_initial_middle',
      'middle_initial_middle_name', // deprecated
      'name_last',
      'last_name', // deprecated
      'name_suffix', // deprecated
      'suffix', // deprecated
      'email',
      'address_line1',
      'mailing_address_line_1', // deprecated
      'address_line2',
      'mailing_address_line_2', // deprecated
      'address_city',
      'city', // deprecated
      'address_state_province',
      'state_province', // deprecated
      'address_zip_postal_code',
      'zip_postal_code', // deprecated
      'address_country',
      'country', // deprecated
      'phone_number',
      'company_organization',
      'fax_number',
    ],
  },

  {
    id: 'request_description',
    title: 'Your request',
    description: domify(`
      The description of the records you are requesting is important. The scope
      of your request can impact how quickly an agency can respond to your
      request. Your description should be as  clear and specific as possible
      and must give agency <span data-term="full-time foia employees">FOIA
      personnel</span> enough detail so that they are able to reasonably
      determine exactly which records are being requested and where to locate
      them.
    `),
    // Ordering is significant
    fieldNames: [
      'request_description',
    ],
  },

  {
    id: 'supporting_docs',
    title: 'Additional information',
    // This section is where the agency-component-specific fields go
    isAgencySpecificFieldSection: true,
    description: domify(`
      If you are submitting a request for records on yourself
      (a “<span data-term="first party request">first
      party</span>” request), use this tool to upload any
      required documentation  to verify your identity.
      You can also use this tool to upload any documents
      that provide context for your request or that could
      help FOIA personnel process your FOIA request.
    `),
    // Ordering is significant
    fieldNames: [
      'attachments_supporting_documentation',
    ],
  },

  {
    id: 'processing_fees',
    title: 'Fee waiver',
    description: domify(`
      Most FOIA requests do not involve any fees.  However, if an agency
      informs you that there are fees associated with your request, you may
      request a <span data-term="fee waiver">fee</span> under the standard
      provided in the FOIA.  You may request a fee waiver at any time during
      the processing of your request.  The agency will grant a fee waiver when
      disclosure of the requested information is in the public interest because
      it is likely to contribute significantly to public understanding of the
      operations and activities of the government and is not primarily in the
      commercial interest of the requester.  Requests for fee waivers from
      individuals who are seeking records pertaining to themselves usually do
      not meet this standard.  Additionally, a requester’s inability to pay
      fees is not a legal basis for granting a fee waiver.  When making a
      request for a fee waiver you must explain how your request meets the
      standard described above.
    `),
    // Ordering is significant
    fieldNames: [
      'request_category',
      'fee_waiver',
      'fee_waiver_explanation',
      'fee_amount_willing',
      'processing_fees', // deprecated
    ],
  },


  {
    id: 'expedited_processing',
    title: 'Request expedited processing',
    description: domify(`
      Agencies generally process requests on a first-in, first-out basis.  Most
      agencies also utilize separate tracks to process simple and complex
      requests.  Under certain circumstances, your request may qualify for
      placement into a separate, expedited track where the agency will
      process it as soon as practicable.  The standards for <span
      data-term="expedited processing">expedited processing</span> are set
      out in the FOIA and in the regulations of each federal agency.  Under the
      FOIA, a requester may qualify for expedited processing if they can
      demonstrate a <span data-term="compelling need">“compelling
      need”</span> for the records.  A “compelling need” can be shown  by:  (1)
      establishing that the  failure to obtain the records on an expedited
      basis “could reasonably be expected to pose an imminent threat to the
      life or physical safety of an individual;” or, (2) if the requester is a
      “person primarily engaged in  disseminating information,” by
      demonstrating that there exists an “urgency to inform the public
      concerning actual or alleged Federal Government activity.”  Agencies may
      also establish additional criteria for granting expedited processing,
      which they describe in their FOIA regulations.  Requesters must
      demonstrate how they meet one of the standards in order to have their
      request processed on an expedited basis.
    `),
    // Ordering is significant
    fieldNames: [
      'expedited_processing',
      'expedited_processing_explanation',
    ],
  },

];

export default FORM_SECTIONS;
