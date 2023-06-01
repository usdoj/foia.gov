import React from 'react';
import Constrain from '../components/wizard_layout_constrain';
import BodyText from '../components/wizard_component_body_text';
import Heading from '../components/wizard_component_heading';
import PageComponent from '../components/wizard_template_page';
import Button from '../components/wizard_component_button';

export default {
  title: 'Pages/Page',
  component: PageComponent,
};

function Template(args) {
  return <PageComponent {...args} />;
}

const content = (
  <Constrain>
    <Heading weight="normal">Hello,</Heading>
    <BodyText>The government hosts a vast amount of information, with records spread across many different agencies, and even different offices within agencies.</BodyText>
    <BodyText>To help you figure out which federal agency might have the information you seek, we’ve developed this tool. If you are looking for non-federal records, such as records from your local police department, we suggest contacting the appropriate state or local authorities</BodyText>
    <BodyText>We recommend giving yourself at least 5 minutes to explore this tool.</BodyText>
    <Button url="#0" size="big">Begin</Button>
  </Constrain>
);

export const Page = Template.bind({});
Page.args = {
  children: content,
};
