import React from 'react';
import PagerComponent from '../components/foia_component_pager';

export default {
  title: 'Components/Pager',
  component: PagerComponent,
};

function Template(args) {
  return <PagerComponent {...args} />;
}

export const Pager = Template.bind({});
Pager.args = {
};
