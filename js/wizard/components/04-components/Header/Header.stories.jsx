import React from 'react';
import HeaderComponent from '.';

export default {
  title: 'Components/Header',
  component: HeaderComponent,
};

function Template(args) {
  return <HeaderComponent {...args} />;
}

export const Header = Template.bind({});
