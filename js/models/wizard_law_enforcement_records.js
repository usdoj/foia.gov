import {
  answer, question, summary, yesNoQuestion,
} from '../util/wizard_helpers';

const question22 = () => yesNoQuestion('q22', {
  yes: summary('m54'),
  no: summary('m55'),
});

/**
 * @type {WizardQuestion}
 */
const lawEnforcementRecordsJourney = question('q20', [
  answer('literal:State or local', summary('m52')),
  answer(
    'literal:Federal law enforcement',
    question('q21', [
      answer('literal:Law enforcement policies and programs', summary('m53')),
      answer('literal:Records about a specific criminal or civil case', yesNoQuestion('q22', {
        yes: summary('m54'),
        no: summary('m55'),
      })),
      answer('literal:Federal prison and parole records', summary('m56')),
      answer('literal:Background check records', summary('m34')),
      answer('literal:Court records', summary('m57')),
      answer('literal:Oversight of the environment and agriculture', summary('m58')),
      answer('literal:Oversight of U.S. financial institutions', summary('m59')),
      answer('literal:Oversight of the workplace', summary('m60')),
      answer('literal:Consumer protection', summary('m61')),
      answer('literal:Oversight of federal agencies', summary('m62')),
    ]),
  ),
  answer("literal:I don't know", question('q23', [
    answer('literal:911 calls', summary('m52')),
    answer('literal:Arrest and/or investigation records', question('q24', [
      answer('literal:Federal investigation'),
      {
        titleMid: 'literal:State or local investigation',
        tooltipMid: 'tt1',
        next: summary('m52'),
      },
      answer('literal:Did the incident happen on or near a military base or involve active-duty military personnel?', summary('m63')),
    ])),
    answer('literal:Prison records', question('q25', [
      answer('literal:County or state prison', summary('m52')),
      answer('literal:Federal prison (view the list of federal prisons)', summary('m64')),
    ])),
    answer('literal:Body worn camera footage', question('q26', [
      answer('literal:Federal investigation', question22()),
      {
        titleMid: 'literal:State or local investigation',
        tooltipMid: 'tt1',
        next: summary('m52'),
      },
    ])),
    answer('literal:Background check', question('q27', [
      {
        titleMid: 'literal:State or local agency',
        tooltipMid: 'tt1',
        next: summary('m52'),
      },
      answer('literal:Federal agency (including the military)', summary('m34')),
      answer('literal:Private organization', summary('m65')),
    ])),
    answer('literal:Court records', question('q28', [
      answer('literal:Federal (Federal Court Finder)', summary('m57')),
      answer('literal:State or local', summary('m66')),
    ])),
  ])),
]);

export default lawEnforcementRecordsJourney;
