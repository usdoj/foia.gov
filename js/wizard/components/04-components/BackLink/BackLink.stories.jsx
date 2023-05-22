import React from 'react';
import BackLinkComponent from '.';

export default {
  title: 'Components/Back Link',
  component: BackLinkComponent,
};

function Template(args) {
  return <BackLinkComponent {...args} />;
}

export const BackLink = Template.bind({});
