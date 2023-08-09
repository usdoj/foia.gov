import React from 'react';
import ModalComponent from '../components/wizard_component_modal';
import { PillGroup } from './component_pill_group.stories';

export default {
  title: 'Components/Modal',
  component: ModalComponent,
};

function Template(args) {
  return <ModalComponent {...args} />;
}

export const Modal = Template.bind({});
Modal.args = {
  title: 'Common topics',
  children: <PillGroup
    {...PillGroup.args}
    label={false}
  />,
  modalIsOpen: true,
};
