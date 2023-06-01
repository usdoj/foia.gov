import React from 'react';
import PageComponent from '../components/wizard_template_page';

export default {
  title: 'Templates/Page',
  component: PageComponent,
};

function Template(args) {
  return <PageComponent {...args} />;
}

export const Page = Template.bind({});
Page.args = {
  children: <h1>Page</h1>,
};
