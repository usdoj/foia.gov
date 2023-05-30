import React from 'react';
import LogoComponent from '../components/wizard_component_logo';
import img from '../../www.foia.gov/img/foia-doj-logo.svg';

export default {
  title: 'Components/Logo',
  component: LogoComponent,
};

function Template(args) {
  return <LogoComponent {...args} />;
}

export const Logo = Template.bind({});
Logo.args = {
  url: '#0',
  logoSrc: img,
  text: 'FOIA.gov',
};
