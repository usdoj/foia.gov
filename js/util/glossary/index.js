import Glossary from 'glossary-panel';
import terms from './terms';

// Optional configurion objects
const selectors = {};
const classes = {};

let glossary;
function getGlossary() {
  return glossary;
}

// Wait for DOM to be loaded before initializing the glossary
document.addEventListener('DOMContentLoaded', () => {
  glossary = new Glossary(terms, selectors, classes);
});

export default getGlossary;

export {
  Glossary,
};
