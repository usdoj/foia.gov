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
    tag: 'Tag',
    title: 'Card Title Content',
  },
  {
    tag: 'Tag',
    title: 'Card Title Content',
  },
  {
    tag: 'Tag',
    title: 'Card Title Content',
  },
  {
    tag: 'Tag',
    title: 'Card Title Content',
  },
  {
    tag: 'Tag',
    title: 'Card Title Content',
  },
  {
    tag: 'Tag',
    title: 'Card Title Content',
  },
];

const cardContentAlt = cardContent.map((card) => {
  const newCard = {
    ...card,
    alt: true,
  };
  return newCard;
});

export const CardGroup = Template.bind({});
CardGroup.args = {
  cardContent,
};

export const CardGroupAlt = Template.bind({});
CardGroupAlt.args = {
  cardContent: cardContentAlt,
  alt: true,
};
