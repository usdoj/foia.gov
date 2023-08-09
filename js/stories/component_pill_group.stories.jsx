import React from 'react';
import PillGroupComponent from '../components/wizard_component_pill_group';

export default {
  title: 'Components/Pill Group',
  component: PillGroupComponent,
};

function Template(args) {
  return <PillGroupComponent {...args} />;
}

const topics = [
  {
    tid: 1,
    title: 'Pill 1',
  },
  {
    tid: 2,
    title: 'Pill 2',
  },
  {
    tid: 3,
    title: 'Pill 3',
  },
  {
    tid: 4,
    title: 'Pill 4',
  },
  {
    tid: 5,
    title: 'Pill 5',
  },
  {
    tid: 6,
    title: 'Pill 6',
  },
  {
    tid: 7,
    title: 'Pill 7',
  },
  {
    tid: 8,
    title: 'Pill 8',
  },
];

export const PillGroup = Template.bind({});
PillGroup.args = {
  label: 'Pill Group',
  topics,
  isTopicSelected: () => {},
  onClickTopicButton: () => {},
};
