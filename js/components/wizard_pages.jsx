import Init from './wizard_page_init';
import Two from './wizard_page_two';
import Three from './wizard_page_three';

/**
 * @type {Record<WizardPage, React.FC>}
 */
const wizardPages = {
  Init,
  Two,
  Three,
};

export default wizardPages;
