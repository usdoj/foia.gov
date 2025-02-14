/**
 * INSTALL:
 *   nvm use
 *   npm ci
 *
 * QUERY API DIRECTLY:
 *   export PD_URL=<predict URL>
 *   export PD_API_KEY=<API key>
 *   node bin/wizard-schema/validate.mjs -q 'your query'
 *
 * VALIDATE LOCAL FILE:
 *   node bin/wizard-schema/validate.mjs -f JSON_FILE
 */
import { z } from 'zod';
import fs from 'node:fs';

function getSchema() {
  return z.object({
    agency_mission_match: z.array(
      z.object({
        abbreviation: z.string(),
        id: z.string(),
        parent: z.null(),
        score: z.number(),
        title: z.string(),
        type: z.string(),
        url: z.string(),
      }),
    ),
    agency_finder_predictions: z.array(
      z.object({
        abbreviation: z.string(),
        confidence_score: z.number(),
        id: z.string(),
        parent: z.nullable(
          z.object({
            abbreviation: z.string(),
            id: z.string(),
            name: z.string(),
            type: z.string(),
          }),
        ),
        title: z.string(),
        type: z.string(),
        url: z.string(),
      }),
    ),
    agency_name_match: z.array(
      z.object({
        abbreviation: z.string(),
        id: z.string(),
        parent: z.null(),
        title: z.string(),
        type: z.string(),
        url: z.string(),
      }),
    ),
    freqdoc_predictions: z.array(
      z.object({
        abbreviation: z.string(),
        component: z.string(),
        parent_abbreviation: z.nullable(z.string()),
        score: z.number(),
        title: z.string(),
        url: z.string(),
      }),
    ),
    predefined_flow: z.nullable(
      z.object({
        confidence_score: z.number(),
        flow: z.string().refine((str) => {
          const valids = [
            // Official flow topics
            'Immigration or Travel records',
            'Tax records',
            'Social Security records',
            'Medical records',
            'Personnel records',
            'Military records',
            'Law Enforcement records',

            // We accept and transform these in wizard_store.js submitRequest()
            'IRS records', // -> Tax records
            'Immigration records', // -> Immigration or Travel records
            'Travel records', // -> Immigration or Travel records
          ].map((topic) => topic.toUpperCase());
          return valids.includes(str.toUpperCase());
        }),
      }),
    ),
  });
}

function validate(obj) {
  const schema = getSchema();
  const result = schema.safeParse(obj);
  if (result.success) {
    console.log('✅ "JSON represents a valid wizard API response.');
  } else {
    console.error('Validation errors:', result.error.issues);
  }
}

if (!process.argv[2] || !process.argv[3]) {
  throw new Error('You must provide a mode and argument.');
}

if (process.argv[2] === '-f') {
  const filename = process.argv[3];
  if (!filename) {
    throw new Error('You must provide a path to the JSON file to be validated.');
  }

  validate(JSON.parse(fs.readFileSync(filename)));
}

if (process.argv[2] === '-q') {
  const input = String(process.argv[3]);

  fetch(process.env.PD_URL, {
    method: 'POST',
    headers: {
      Authorization: `Api-Key ${process.env.PD_API_KEY}`,
    },
    body: JSON.stringify({ input }),
  }).then((res) => {
    if (!res.ok) {
      throw res;
    }
    return res.json();
  })
    .then((obj) => {
      console.log(JSON.stringify(obj, null, 2));
      validate(obj);
    });
}
