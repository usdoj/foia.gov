import React from 'react';
import AppContainer from '../components/wizard_layout_app_container';
import PageComponent from '../components/wizard_template_page';

export default {
  title: 'Templates/Page',
  component: PageComponent,
};

function Template(args) {
  return (
    <AppContainer>
      <PageComponent {...args} />
    </AppContainer>
  );
}

export const Page = Template.bind({});
Page.args = {
  children: <h1>Page</h1>,
};
