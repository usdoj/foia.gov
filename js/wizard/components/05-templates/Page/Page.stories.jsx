import React from 'react';
import PageComponent from '.';

export default {
  title: 'Templates/Page',
  component: PageComponent,
};

function Template(args) {
  return <PageComponent {...args} />;
}

export const Default = Template.bind({});
Default.args = {
  children: <h1>Page</h1>,
};

export const Purple = Template.bind({});
Purple.args = {
  color: 'purple',
  children: <h1>Page</h1>,
};

export const White = Template.bind({});
White.args = {
  color: 'white',
  children: <h1>Page</h1>,
};

export const Gray = Template.bind({});
Gray.args = {
  color: 'gray',
  children: <h1>Page</h1>,
};
