import {
  answer, question, summary, yesNoQuestion,
} from '../util/wizard_helpers';

/**
 * @type {WizardQuestion}
 */
const lawEnforcementRecordsJourney = question('q20', [
  answer(
    'literal:State or local',
    summary('m52'),
    'State or local law enforcement records',
  ),
  answer(
    'literal:Federal',
    question('q21', [
      answer(
        'literal:Records about a specific federal criminal or civil case',
        yesNoQuestion('q22', {
          yes: summary('m54'),
          topicIfYes: 'Records about a specific federal criminal or civil case on or near a military base or involving active-duty military personnel',
          no: summary('m55'),
        }),
        'Records about a specific federal criminal or civil case',
      ),
      answer(
        'literal:Federal prison and parole records',
        summary('m56'),
        'Federal prison and parole records',
      ),
      answer(
        'literal:Background investigation and security records',
        summary('m34'),
        'Federal background investigation and security records',
      ),
      answer(
        'literal:Court records',
        summary('m57'),
        'Federal court records',
      ),
      answer(
        'literal:Oversight of the environment, natural resources, and agriculture',
        summary('m58'),
        'Federal records related to the oversight of the environment, natural resources, and agriculture',
      ),
      answer(
        'literal:Oversight of U.S. financial institutions',
        summary('m59'),
        'Federal records related to the oversight of U.S. financial institutions',
      ),
      answer(
        'literal:Oversight of the workplace',
        summary('m60'),
        'Federal records related to the oversight of the workplace',
      ),
      answer(
        'literal:Consumer protection',
        summary('m61'),
        'Federal records related to consumer protection',
      ),
      answer(
        'literal:Oversight of federal agencies',
        summary('m62'),
        'Federal records related to the oversight of federal agencies',
      ),
      answer(
        'literal:Law enforcement/criminal justice policies and programs',
        summary('m53'),
        'Federal records related to law enforcement/criminal justice policies and programs',
      ),
    ]),
    'Federal law enforcement records',
  ),
  answer("literal:I don't know", question('q23', [
    answer(
      'literal:911 calls',
      summary('m52'),
      'Records related to 911 calls',
    ),
    answer(
      'literal:Arrest and/or investigation records',
      question('q24', [
        answer('literal:Federal investigation', yesNoQuestion('q22', {
          yes: summary('m54'),
          topicIfYes: 'Records about a specific federal criminal or civil case on or near a military base or involving active-duty military personnel',
          no: summary('m55'),
        }), 'Records related to a federal investigation'),
        {
          titleMid: 'literal:State or local investigation',
          newDisplayedTopic: 'Records related to a state or local investigation',
          tooltipMid: 'tt1',
          next: summary('m52'),
        },
      ]),
      'Records related to an arrest and/or investigation',
    ),
    answer(
      'literal:Prison records',
      question('q25', [
        answer(
          'literal:County or state prison',
          summary('m52'),
          'County or state prison records',
        ),
        answer(
          'literal:Federal prison (view the <a target="_blank" href="https://www.bop.gov/mobile/locations/">list of federal prisons</a>)',
          summary('m64'),
          'Federal prison records',
        ),
      ]),
      'Prison records',
    ),
    answer(
      'literal:Body worn camera footage',
      question('q26', [
        answer(
          'literal:Federal investigation',
          yesNoQuestion('q22', {
            yes: summary('m54'),
            topicIfYes: 'Body worn camera footage on or near a military base or involving active-duty military personnel',
            no: summary('m67'),
          }),
          'Body worn camera footage related to a federal investigation',
        ),
        {
          titleMid: 'literal:State or local investigation',
          newDisplayedTopic: 'Body worn camera footage related to a state or local investigation',
          tooltipMid: 'tt1',
          next: summary('m52'),
        },
      ]),
      'Body worn camera footage',
    ),
    answer(
      'literal:Background check for employment',
      question('q27', [
        {
          titleMid: 'literal:State or local agency',
          newDisplayedTopic: 'Records related to a background check for employment performed by a state or local agency',
          tooltipMid: 'tt1',
          next: summary('m52'),
        },
        answer(
          'literal:Federal agency (including the military)',
          summary('m34'),
          'Records related to a background check for a federal agency (including the military)',
        ),
        answer(
          'literal:Private organization',
          summary('m65'),
          'Records related to a private organization',
        ),
      ]),
      'Records related to a background check for employment',
    ),
    answer(
      'literal:Court records',
      question('q28', [
        answer(
          'literal:Federal (use the <a href="https://www.uscourts.gov/federal-court-finder/search" target="_blank">Federal Court Finder</a>)',
          summary('m57'),
          'Federal court case records',
        ),
        answer(
          'literal:State or local',
          summary('m66'),
          'State or local court case records',
        ),
      ]),
      'Court records',
    ),
  ])),
]);

export default lawEnforcementRecordsJourney;
