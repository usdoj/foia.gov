import React from 'react';
import LogoComponent from '.';
import img from '../../../../../www.foia.gov/img/foia-doj-logo.svg';

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
