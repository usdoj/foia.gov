import React from 'react';
import FormItemComponent from '../components/wizard_component_form_item';

export default {
  title: 'Components/Form Item',
  component: FormItemComponent,
};

function Template(args) {
  return <FormItemComponent {...args} />;
}

export const Text = Template.bind({});
Text.args = {
  type: 'text',
  label: 'Text Field Label',
  placeholder: 'Placeholder',
};

export const Textarea = Template.bind({});
Textarea.args = {
  type: 'textarea',
  label: 'Textarea Field Label',
  placeholder: 'Placeholder...',
};

export const Checkbox = Template.bind({});
Checkbox.args = {
  type: 'checkbox',
  label: 'Checkbox Field Label',
  name: 'Test',
};

export const Radio = Template.bind({});
Radio.args = {
  type: 'radio',
  label: 'Radio Field Label',
  name: 'Test',
};
