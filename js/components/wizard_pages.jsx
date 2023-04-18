import { createContext } from 'react';
import One from './wizard_page_one';
import Two from './wizard_page_two';
import Three from './wizard_page_three';

/**
 * @type {Record<WizardPageKey, React.FC>}
 */
const wizardPages = {
  One,
  Two,
  Three,
};

// Temporary. Will be replaced with Zustand store.
const WizardCtx = createContext({});

export { WizardCtx };
export default wizardPages;
