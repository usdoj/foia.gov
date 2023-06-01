import React from 'react';
import Constrain from '../components/wizard_layout_constrain';
import BodyText from '../components/wizard_component_body_text';
import Heading from '../components/wizard_component_heading';
import PageComponent from '../components/wizard_template_page';

export default {
  title: 'Pages/Form',
  component: PageComponent,
};

function Template(args) {
  return <PageComponent {...args} />;
}

const content = (
  <Constrain>
    <Heading weight="normal">Let's dive in...</Heading>
    <BodyText>What information are you looking for?</BodyText>
  </Constrain>
);

export const Form = Template.bind({});
Form.args = {
  children: content,
};
