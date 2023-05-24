import React from 'react';
import Page from '../components/wizard_template_page';

export default {
  title: 'Templates/Page',
  component: Page,
};

function Template(args) {
  return <Page {...args} />;
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
