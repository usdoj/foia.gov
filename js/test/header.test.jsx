import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Header from 'components/header';

describe('Header', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Header />);
  });

  it('renders a header', () => {
    expect(wrapper.contains(<h1>React header</h1>)).to.be.true;
  });
});
