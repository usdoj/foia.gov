import React, { useState } from 'react';
import { useWizard } from '../stores/wizard_store';
import BodyText from './wizard_component_body_text';
import Button from './wizard_component_button';
import FormItem from './wizard_component_form_item';
import Modal from './wizard_component_modal';

function LastStepsBlock() {
  const { actions } = useWizard();

  const [selectedLabel, setSelectedLabel] = useState(/** @type string | null */ null);
  const [modalIsOpen, setIsOpen] = useState(/** @type boolean */ false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const options = [
    {
      label: 'Yes, I would like to refine my search.',
      action: actions.jumpBackToQueryPage,
    },
    {
      label: 'Yes, I would like to browse the full list of agencies.',
      action: () => { window.location = '/agency-search.html'; },
    },
    {
      label: 'Yes, I would like to go back to the FOIA.gov home page.',
      action: () => { window.location = '/'; },
    },
    {
      label: 'No.',
      action: openModal,
    },
  ];

  function handleSubmit() {
    const option = options.find((opt) => opt.label === selectedLabel);
    option.action();
  }

  return (
    <form aria-label="Can we help you with anything else?">
      <fieldset>
        <legend>Can we help you with anything else?</legend>
        {options.map(({ label }) => (
          <FormItem
            type="radio"
            name="help-anything-else"
            key={label}
            label={label}
            value={label}
            onChange={() => setSelectedLabel(label)}
          />
        ))}
        <Button onClick={handleSubmit}>Submit</Button>
      </fieldset>
      <Modal
        title="Thank you for using our tool!"
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        contentLabel="Thank you for using our tool!"
      >
        <BodyText>You may close this browser window.</BodyText>
      </Modal>
    </form>
  );
}

export default LastStepsBlock;
