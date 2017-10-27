export const FORM_SECTIONS = [
  {
    id: 'requester_contact',
    title: 'Requester contact',
    description: 'Complete the information describing yourself and how the agency can contact you about your request.',
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
    title: 'Request description',
    description: 'Describe the records you are requesting. Be as specific as possible.',
    fieldNames: [
      'request_description',
    ],
  },

  {
    id: 'supporting_docs',
    title: 'Supporting documentation',
    description: 'Include any supporting documentation related to your request.',
    fieldNames: [
      'attachments_supporting_documentation',
    ],
  },

  {
    id: 'processing_fees',
    title: 'Processing fees',
    description: 'Under certain circumstances you may need to pay for processing fees.',
    fieldNames: [
      'fee_waiver',
      'fee_amount_willing',
      'fee_waiver_explanation',
    ],
  },


  {
    id: 'delivery_method',
    title: 'Delivery method',
    description: 'How would you like to receive your request?',
    fieldNames: [
      'delivery_method',
      'expedited_processing',
      'expedited_processing_explanation',
    ],
  },

];

export const ADDITIONAL_FIELDS_SECTION = {
  id: 'additional_fields',
  title: 'Additional fields',
  description: 'This addtional information may be helpful for the agency to fulfill your FOIA request.',
};
