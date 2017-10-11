import Glossary from 'glossary-panel';
import terms from './terms';

// Optional configurion objects
const selectors = {};
const classes = {};

const glossary = new Glossary(terms, selectors, classes);

export default glossary;

export {
  Glossary,
};
