import fs from 'fs';
import path from 'path';

import terms from './js/util/glossary/terms';

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
