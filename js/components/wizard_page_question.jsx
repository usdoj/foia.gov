import React from 'react';
import { useWizard } from '../stores/wizard_store';
import PageTemplate from './wizard_template_page';
import Constrain from './wizard_layout_constrain';
import Button from './wizard_component_button';
import RichText from './wizard_component_rich_text';
import FormItem from './wizard_component_form_item';
import WizardHtml from './wizard_html';
import MoreResults from './wizard_component_more_results';
import Label from './wizard_component_label';
import Quote from './wizard_component_quote';
import QuestionText from './wizard_component_question';
import Inline from './wizard_layout_inline';
import QuestionHead from './wizard_layout_question_head';

function Question() {
  const {
    actions, activity, answerIdx, canSwitchToModelResults, displayedTopic, request, getMessage,
  } = useWizard();

  if (activity.type !== 'question') {
    throw new Error('Not a question');
  }

  return (
    <PageTemplate>
      <Constrain>
        <RichText>
          <QuestionHead>
            <h1>Search Question</h1>
            <Inline>
              <Label isItalic>
                <WizardHtml mid="lookingFor" />
              </Label>
              <Quote>
                {displayedTopic || request.query}
              </Quote>
            </Inline>
          </QuestionHead>

          <form>
            <fieldset>
              <QuestionText>
                <WizardHtml mid={activity.titleMid} />
              </QuestionText>
              {activity.answers.map((answer, idx) => (
                <div key={answer.titleMid}>
                  <FormItem
                    type="radio"
                    name="question"
                    labelHtml={getMessage(answer.titleMid)}
                    value={idx}
                    mid={answer.titleMid}
                    tooltipMid={answer.tooltipMid}
                    checked={idx === answerIdx}
                    onChange={() => {
                      actions.selectAnswer(idx);
                    }}
                  />
                </div>
              ))}
            </fieldset>
          </form>

          {typeof activity.addendumMid === 'string' && (
            <WizardHtml mid={activity.addendumMid} />
          )}
        </RichText>
        {answerIdx !== null && (
          <Button onClick={actions.nextPage}>
            Next
          </Button>
        )}
        {canSwitchToModelResults && <MoreResults />}
      </Constrain>
    </PageTemplate>
  );
}

export default Question;
