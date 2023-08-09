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
      try {
        glossary = new Glossary(terms, selectors, classes);
      } catch (e) {
        if (e.toString().includes("null (reading 'querySelector')")) {
          // Markup wasn't on page. Just ignore.
        } else {
          console.error(e);
        }
      }
    });
});

export default getGlossary;

export {
  Glossary,
};
