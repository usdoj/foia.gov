import React, { useState } from 'react';
import { useWizard } from '../stores/wizard_store';
import BodyText from './wizard_component_body_text';
import Button from './wizard_component_button';
import FormItem from './wizard_component_form_item';
import Modal from './wizard_component_modal';

function LastStepsBlock() {
  const { actions } = useWizard();

  const [value, setValue] = useState(/** @type string | null */ null);
  const [modalIsOpen, setIsOpen] = useState(/** @type boolean */ false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  function handleChange(e) {
    setValue(e.target.value);
  }

  function doSelectedAction() {
    let selectedAction;
    switch (value) {
      case 'Refine Search':
        return actions.nextPage();
      case 'Go to foia.gov':
        window.location = '/';
        break;
      case 'Go to Agency Listing Page':
        window.location = '/#agency-search';
        break;
      case 'Say Thank You':
        return openModal();
      default: break;
    }
    return selectedAction;
  }

  return (
    <form aria-label="Can we help you with anything else?">
      <fieldset>
        <legend>Can we help you with anything else?</legend>

        <FormItem type="radio" label="Yes, I would like to refine my search." name="help-anything-else" value="Refine Search" onChange={handleChange} />

        <FormItem type="radio" label="Yes, I would like to browse the full list of agencies." name="help-anything-else" value="Go to Agency Listing Page" onChange={handleChange} />

        <FormItem type="radio" label="Yes, I would like to go back to the FOIA.gov home page." name="help-anything-else" value="Go to foia.gov" onChange={handleChange} />

        <FormItem type="radio" label="No" name="help-anything-else" value="Say Thank You" onChange={handleChange} />

        <Button
          onClick={doSelectedAction}
        >
          Submit
        </Button>
      </fieldset>
      <Modal
        title="Thank you for using our tool!"
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
      >
        <BodyText>You may close this browser window.</BodyText>
      </Modal>
    </form>
  );
}

export default LastStepsBlock;
