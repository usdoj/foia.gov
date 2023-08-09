import React from 'react';
import PillComponent from '../components/wizard_component_pill';

export default {
  title: 'Components/Pill',
  component: PillComponent,
};

function Template(args) {
  return <PillComponent {...args} />;
}

export const Pill = Template.bind({});
Pill.args = {
  children: 'Pill',
};
