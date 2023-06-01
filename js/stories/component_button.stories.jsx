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

export const Small = Template.bind({});
Small.args = {
  children: 'Button',
  size: 'small',
};

export const Big = Template.bind({});
Big.args = {
  children: 'Button',
  size: 'big',
};

export const Link = Template.bind({});
Link.args = {
  children: 'Button',
  isLink: true,
};
