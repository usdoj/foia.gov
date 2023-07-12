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
  card: {
    tag: 'Department of Homeland Security',
    title: 'Placeholder Agency Name',
  },
};

export const CardAlt = Template.bind({});
CardAlt.args = {
  card: {
    tag: 'fbi.gov',
    title: 'Placeholder name of link lorem ipsum',
    alt: true,
  },
};
