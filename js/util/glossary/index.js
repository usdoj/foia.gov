import Glossary from 'glossary-panel';
import localApi from '../local_api';

// Optional configurion objects
const selectors = {};
const classes = {};

let glossary;
function getGlossary() {
  return glossary;
}

// Wait for DOM to be loaded before initializing the glossary
document.addEventListener('DOMContentLoaded', () => {
  localApi.glossary()
    .then((terms) => {
      // Current template may not have glossary markup.
      if (Glossary.markupIsReady()) {
        glossary = new Glossary(terms, selectors, classes);
      }
    });
});

export default getGlossary;

export {
  Glossary,
};
