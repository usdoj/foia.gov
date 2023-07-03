import React from 'react';
import CardGroupComponent from '../components/foia_component_card_group';

export default {
  title: 'Components/Card Group',
  component: CardGroupComponent,
};

function Template(args) {
  return <CardGroupComponent {...args} />;
}

const cardContent = [
  {
    category: 'Category',
    title: 'Card Title Content',
  },
  {
    category: 'Category',
    title: 'Card Title Content',
  },
  {
    category: 'Category',
    title: 'Card Title Content',
  },
  {
    category: 'Category',
    title: 'Card Title Content',
  },
  {
    category: 'Category',
    title: 'Card Title Content',
  },
  {
    category: 'Category',
    title: 'Card Title Content',
  },
];

export const CardGroup = Template.bind({});
CardGroup.args = {
  cardContent,
};
