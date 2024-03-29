import React, { useState } from 'react';
import { useWizard } from '../stores/wizard_store';
import BodyText from './wizard_component_body_text';
import Button from './wizard_component_button';
import FormItem from './wizard_component_form_item';
import Modal from './wizard_component_modal';

function LastStepsBlock() {
  const { actions } = useWizard();

  const [selectedAction, setSelectedAction] = useState(/** @type function | null */ null);
  const [modalIsOpen, setIsOpen] = useState(/** @type boolean */ false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const options = [
    {
      label: 'Yes, I would like to do another search.',
      action: actions.jumpBackToQueryPage,
    },
    {
      label: 'Yes, I would like to browse the full list of agencies.',
      action: () => { location.href = '/agency-search.html'; },
    },
    {
      label: 'Yes, I would like to go back to the FOIA.gov home page.',
      action: () => { location.href = '/'; },
    },
    {
      label: 'No.',
      action: openModal,
    },
  ];

  return (
    <form className="w-component-last-steps">
      <fieldset>
        <legend className="w-legend">Can we help you with anything else?</legend>
        {options.map(({ action, label }) => (
          <FormItem
            type="radio"
            name="help-anything-else"
            key={label}
            label={label}
            value={label}
            // Must give setSelectedAction a function so react doesn't interpret
            // it as a setter.
            onChange={() => setSelectedAction(() => action)}
          />
        ))}

        {selectedAction !== null && (
          <Button onClick={selectedAction}>Submit</Button>
        )}
      </fieldset>

      <Modal
        title="Thank you for using our tool!"
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        contentLabel="Thank you for using our tool!"
        isAlt
      >
        <BodyText>You may close this browser window.</BodyText>
      </Modal>
    </form>
  );
}

export default LastStepsBlock;
