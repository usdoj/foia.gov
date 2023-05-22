import React from 'react';
import HeadingComponent from '.';

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
