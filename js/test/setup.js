import { expect } from 'chai';
import sinon from 'sinon';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() });

// Set globals
Object.assign(global, {
  expect,
  sinon,
});

