import React from 'react';
import CardComponent from '../components/foia_component_card';

export default {
  title: 'Components/Card',
  component: CardComponent,
};

function Template(args) {
  return <CardComponent {...args} />;
}

export const Card = Template.bind({});
Card.args = {
  category: 'Department of Homeland Security',
  title: 'Placeholder Agency Name',
};
