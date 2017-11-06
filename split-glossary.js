/*
 * Split the glossary and form sections into individual markdown files. This
 * lets the content folks edit conten in markdown/yaml rather than javascript
 * files.
 *
 * This script has a few additional dependencies:
 *
 *     $ npm install -g babel-node
 *     $ npm install babel-preset-env
 *     $ echo '{"presets": ["env"]}' > .babelrc
 *     $ babel-node ./split-glossary.js
 */
import fs from 'fs';
import path from 'path';

import terms from './js/util/glossary/terms';
import sections from './js/util/request_form/form_sections';

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9-]+/g, '-');
}

function unindent(text) {
  return text.replace(/\n[\s]+/g, '\n');
}


terms.forEach((term) => {
  const filepath = path.join('www.foia.gov', '_glossary_terms', `${slugify(term.term)}.md`);
  console.log(filepath);
  const stream = fs.createWriteStream(filepath);
  stream.write('---\n');
  stream.write(`term: "${term.term}"\n`);
  stream.write('---\n');
  stream.write(unindent(term.definition));
  stream.write('\n');
  stream.end();
});

sections.forEach((section, index) => {
  // Prefix the file with a number to keep the sort order
  const filepath = path.join('www.foia.gov', '_request_form_sections', `0${index + 1}-${section.id}.md`);
  console.log(filepath);
  const stream = fs.createWriteStream(filepath);
  stream.write('---\n');
  stream.write(`title: "${section.title}"\n`);
  stream.write(`_id: ${section.id}\n`);
  if (section.isAgencySpecificFieldSection) {
    stream.write('isAgencySpecificFieldSection: true\n');
  }

  if (!section.fieldNames.length) {
    stream.write('fieldNames: []\n');
  } else {
    stream.write('fieldNames:\n');
    section.fieldNames.forEach((fieldName) => {
      stream.write(`- ${fieldName}\n`);
    });
  }

  stream.write('---');
  stream.write(unindent(section.description));
  stream.end();
});
