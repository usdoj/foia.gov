import React from 'react';
import ButtonComponent from '../components/wizard_component_button';

export default {
  title: 'Components/Button',
  component: ButtonComponent,
};

function Template(args) {
  return <ButtonComponent {...args} />;
}

export const Default = Template.bind({});
Default.args = {
  children: 'Button',
};

export const Link = Template.bind({});
Link.args = {
  children: 'Button',
  href: '#0',
  isLink: true,
};
