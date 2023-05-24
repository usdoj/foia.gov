import React from 'react';
import HeaderComponent from '../components/wizard_component_header';

export default {
  title: 'Components/Header',
  component: HeaderComponent,
};

function Template(args) {
  return <HeaderComponent {...args} />;
}

export const Header = Template.bind({});
