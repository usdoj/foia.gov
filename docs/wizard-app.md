# FOIA Wizard app

The wizard app is a ReactJS application located at `wizard.html` which provides shortcuts to already public records and/or directs users to particular agencies to make FOIA requests.

## Application Structure


### Entry point

`/js/wizard.jsx`

### Page

`/js/pages/wizard.jsx`

The `WizardPageWrapper` component is responsible for managing the application.
It is implemented as a flux container to load the `agencyComponentStore` and an
inner component to route between pages (stored in `/js/components/wizard_pages`).

### Stores

Besides the agency component store, the wizard implements a [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction) store in `js/stores/wizard_store.js`. (Types
for objects in this store are documented in `js/wizard-types.d.ts`.)

Notable is the type `WizardVars` which represent the raw state of the UX. The `use_wizard()`
React hook, defined at the bottom simplifies the state exposed to pages and components.

## Predefined user flows

Each predefined flow is implemented as a `WizardTopic` object defined in `js/models/wizard_topics.js`.
Its `journey` property is the first question object the user experiences, modeled as a
nested object of answers and additional questions, and other examples of `WizardActivity`.

In this way, actions within the store can move the user along the journey, eventually ending
with a `WizardSummary`, which either shows a message or a set of links and agencies fetched
within the `submitRequest()` action. Strong type definitions of all the involved `WizardActivity`
instances ensure usable IDE auto-complete and even type-checking much of the Wizard app using th
TypeScript compiler:

```
npm i -g typescript
npx tsc --project js/wizard.tsconfig.json
```

Helper functions like `question`, `answer`, `yesNoQuestion`, `continueStep`, and `summary` can
be used to simplify journey creation. E.g. the tax records journey:

```js
/** @type {WizardQuestion} */
const taxTypeQuestion = question('q1', [
  answer(
    'a15',
    summary('m16'),
    extraMessages.a15,
  ),
  answer(
    'a16',
    summary('m17'),
    extraMessages.a16,
  ),
  answer(
    'a17',
    summary('m18'),
    extraMessages.a17,
  ),
  answer(
    'startOver',
    { type: 'start-over' },
  ),
]);
```

In this journey, if the user's answer is ID `a15`, they proceed immediately to the summary page
showing the content with ID `m16`. (Unfortunately the 3rd argument of `answer()` doesn't accept
a message ID, so here we're just pointing to a string in another JS file. This argument is used
to modify the query displayed to the user at the top of the page (overwriting what they typed)).

### Adding a question

To do this, you would find the object that currently represents an activity within the journey,
such as a `WizardContinue` or `WizardSummary`. Then you would replace that object with a new
`WizardQuestion` (or use `question()` or `yesNoQuestion()`). The other object(s) can be nested
inside a particular answer within the question.

```
Old: question -> answer -> summary
              -> answer -> summary

New: question -> answer -> summary
              -> answer -> NEW QUESTION -> answer -> summary
                                        -> answer -> summary
```

## Message strings

Strings like `m15` are populated from Drupal settings, fetched from the endpoint `/api/foia_wizard`.
Many question and answer strings are hardcoded in the file `js/models/wizard_extra_messages.js`, but
these could eventually be migrated to Drupal settings.

Some object message ID fields are populated instead with string literals:

```
'm15' --> Use the string with ID = m15, likely populated from a Drupal WYSIWYG field.

'literal:Hello World' --> Use the string "Hello World"
```

### Client-side message transformation

Within the Wizard app, messages are fed through the function `useWizard().getMessage()` and are
further processed in the `RichText` component (`js/components/wizard_component_rich_text.jsx`)
resulting in markup being transformed to display links as cards, or with external icons, or
to open in new tabs.
