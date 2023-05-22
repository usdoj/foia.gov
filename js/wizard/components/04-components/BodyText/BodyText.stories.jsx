import React from 'react';
import BodyTextComponent from '.';

export default {
  title: 'Components/Body Text',
  component: BodyTextComponent,
};

function Template(args) {
  return <BodyTextComponent {...args} />;
}

export const BodyText = Template.bind({});
BodyText.args = {
  children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut malesuada malesuada felis, sed rutrum risus semper vitae. Sed eleifend dolor sed faucibus bibendum. Nulla facilisi. Sed tellus orci, egestas vitae elementum sit amet, ultricies at purus. Nunc tempor, massa eu eleifend fringilla, ipsum ante facilisis elit, id finibus dui massa id magna. Donec quis dolor id enim molestie volutpat. Quisque sit amet laoreet mi, a finibus nunc. Aenean nibh turpis, luctus vel magna quis, sollicitudin aliquet ante. Nam vel placerat lacus, porta tincidunt nisi. Etiam pellentesque sed massa vel congue.',
};
