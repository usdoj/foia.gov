import React from 'react';
import HeadingComponent from '../components/wizard_component_heading';

export default {
  title: 'Components/Heading',
  component: HeadingComponent,
};

function Template(args) {
  return <HeadingComponent {...args} />;
}

export const Heading = Template.bind({});
Heading.args = {
  children: 'Heading Text',
};
