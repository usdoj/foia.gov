/* eslint-disable no-console,comma-dangle */
/*
 * One-off script to jekyllize legacy pages. Pages are converted in-place. We
 * look for the #content element to grab the contents of the page and then add
 * a basic frontmatter. Obviously, many things are not taken into account, like
 * special stylesheets or scripts included in <head> and additional inline
 * <script> tags in the body, so it is critical that each file be reviewed.
 *
 * The script reads the list of files to migrate from stdin. I used a command
 * like this to reset the git state, convert the pages, and then view the diff
 * of built files.
 *
 *     $ git co HEAD -- www.foia.gov && node ./migrate-legacy.js < <( cat legacy-pages.txt) && make build && cp -R _site/* _www.foia.gov-canary/ && git diff --minimal -w -b --ignore-blank-lines -- _www.foia.gov-canary/
 *
 * Nearly every file needed at least a little massaging before it was good,
 * including invalid byte sequences in text (garbled characters from incorrect
 * encoding).
 */
const fs = require('fs');

const cheerio = require('cheerio');


const pageToNavigationMap = [
  [/developer.html$/, 'about'],
];

function guessNavigation(filepath) {
  let navigation = 'about'; // default

  pageToNavigationMap.forEach(([pattern, nav]) => {
    if (pattern.test(filepath)) {
      navigation = nav;
    }
  });

  return navigation;
}

function processFile(filepath) {
  if (!filepath) {
    return;
  }

  console.log(`processing ${filepath}`);
  const html = fs.readFileSync(filepath);
  const $ = cheerio.load(html);
  const $content = $('#content');

  if (!$content.length) {
    console.log(`no #content in ${filepath}`);
    return;
  }

  const content = $content.html()
    // cheerio converts html entities to byte codes, convert them back for
    // human readability
    .replace(/&#xA0;/g, '&nbsp;')
    .replace(/&#xF1;/g, '&ntilde;')
    .replace(/&#x2019;/g, '&rsquo;')
    .replace(/&#x2013;/g, '&ndash;')
    .replace(/&#x201C;/g, '&ldquo;')
    .replace(/&#x201D;/g, '&rdquo;')
    .replace(/&#xBB;/g, '&rsquo;');

  const stream = fs.createWriteStream(filepath);

  const title = $('title').text()
    .replace(/^FOIA.gov - Freedom of Information Act: /, '')
    .replace(/^FOIA.gov - Freedom of Information Act$/, ''); // Default title should be left blank

  const navigation = guessNavigation(filepath);

  stream.write('---\n');
  if (title) {
    stream.write(`title: "${title}"\n`);
  }

  stream.write(`navigation: ${navigation}\n`);
  stream.write(`layout: default
grid: 'grid-legacy'
use-uswds: false
use-legacy-scripts: true
---\n`);
  stream.write(content);
  stream.write('\n');
  stream.end();
}

function flush(buffer) {
  Promise.all(
    buffer.split('\n')
      .filter(file => !/^#/.test(file))
      .map(file => processFile(file))
  );
}

function main() {
  let buffer = '';
  process.stdin.on('data', (chunk) => {
    buffer += chunk.toString();
  });

  process.stdin.on('end', () => {
    flush(buffer);
  });
}

main();
