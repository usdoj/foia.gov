import militaryRecordsJourney from './wizard_military_records';

/**
 * @type {WizardQuestion}
 */
const personnelRecordsJourney = {
  type: 'question',
  titleMid: 'q8',
  answers: [
    {
      titleMid: 'literal:Civilian',
      next: {
        type: 'question',
        titleMid: 'q1',
        answers: [
          {
            titleMid: 'a1',
            next: {
              type: 'question',
              titleMid: 'q9',
              answers: [
                {
                  titleMid: 'literal:Current',
                  next: {
                    type: 'summary',
                    titleMid: 'm31',
                  },
                },
                {
                  titleMid: 'literal:Former',
                  next: {
                    type: 'continue',
                    titleMid: 'm1',
                    next: {
                      type: 'summary',
                      titleMid: 'm32',
                    },
                  },
                },
              ],
            },
          },
          {
            titleMid: 'a2',
            next: {
              type: 'continue',
              titleMid: 'm2',
              next: {
                type: 'summary',
                titleMid: 'm33',
              },
            },
          },
        ],
      },
    },
    {
      titleMid: 'literal:Military',
      // Reference to military recs journey
      next: militaryRecordsJourney,
    },
  ],
};

export default personnelRecordsJourney;
