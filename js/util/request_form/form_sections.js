/*
 * FormSections
 *
 * Contains hard-coded form sections to split up the FOIA request form.
 */
import domify from './domify';


export const FORM_SECTIONS = [
  {
    id: 'requester_contact',
    title: 'Contact information',
    description: `
      The information you supply here will be used to provide a response for
      your request for  information. Please note that not all of these fields
      are required.
    `,
    fieldNames: [
      // deprecated names https://github.com/18F/beta.foia.gov/issues/188
      'prefix_title',
      'first_name',
      'last_name',
      'middle_initial_middle_name',
      'suffix',
      'mailing_address_line_1',
      'mailing_address_line_2',
      'city',
      'country',
      'state_province',
      'zip_postal_code',

      'name_prefix_title',
      'name_first',
      'name_middle_initial_middle',
      'name_last',
      'name_suffix',
      'address_line1',
      'address_line2',
      'address_city',
      'address_state_province',
      'address_country',
      'address_zip_postal_code',
      'phone_number',
      'fax_number',
      'company_organization',
      'email',
    ],
  },

  {
    id: 'request_description',
    title: 'Your request',
    description: domify(`
      The description of the records you are requesting is important. The scope
      of your request can impact how quickly an agency could respond to your
      request. Your description should be as  clear and specific as possible
      and must give agency <span data-term="full-time foia employees">FOIA
      personnel</span> enough detail so that they are able to reasonably
      determine exactly which records are being requested and where to locate
      them.
    `),
    fieldNames: [
      'request_description',
    ],
  },

  {
    id: 'supporting_docs',
    title: 'Additional information',
    description: domify(`
      If you are submitting a <span data-term="first party request">first party request</span>,
      use this tool to upload any required documentation (see the agency’s FOIA Reference
      Guide or FOIA regulations) to verify your identity <span data-term="certification of identity">
      Certification of Identity</span> with the agency you are requesting information from. You can
      also use this tool to upload documents providing context for your request
      to help FOIA personnel process your FOIA request.
    `),
    fieldNames: [
      'attachments_supporting_documentation',
    ],
  },

  {
    id: 'processing_fees',
    title: 'Fee waiver',
    description: domify(`
      There is no initial <span data-term="fee waiver">fee</span> required to
      submit a FOIA request, but the FOIA does allow people requesting records
      to be charged certain types of fees in some instances. If fees will be at
      issue in your request, you may request a waiver of those fees. Fee
      waivers are limited to situations in which a requester can show that the
      disclosure of the requested information is in the public interest because
      it is likely to contribute significantly to public understanding of the
      operations and activities of the government, and is not primarily in the
      commercial interest of the requester.
    `),
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
      You may be entitled to have your request processed on an <span
      data-term="expedited processing">expedited basis</span> if you demonstrate a
      <span data-term="compelling need">“compelling need”</span> or satisfy
      any additional standards that may be included in the regulations of the
      agency to which you are submitting your request.  A compelling need
      exists only if you can establish: (1) that failure to
      obtain records quickly could reasonably be expected to pose an imminent
      threat to the life and safety of an individual, or (2) that you are a
      person primarily engaged in disseminating information and there is an
      urgency to inform the public concerning actual or alleged federal
      government activity.  You should consult the agency’s FOIA regulations
      for any additional standards that may qualify for expedited processing.
    `),
    fieldNames: [
      'expedited_processing',
      'expedited_processing_explanation',
    ],
  },

];

export const ADDITIONAL_FIELDS_SECTION = {
  id: 'additional_fields',
  title: 'Additional information',
  description: 'This addtional information may be helpful for the agency to fulfill your FOIA request.',
};
