import React from 'react';
import { useWizard } from '../stores/wizard_store';
import PageTemplate from './wizard_template_page';
import Constrain from './wizard_layout_constrain';
import Button from './wizard_component_button';
import RichText from './wizard_component_rich_text';
import FormItem from './wizard_component_form_item';

function Question() {
  const {
    actions, canGoBack, request,
  } = useWizard();

  const { question } = request || {};

  if (!request || !question) {
    return null;
  }

  return (
    <PageTemplate>
      <Constrain>
        <RichText>
          <p>One more question about:</p>

          <blockquote>
            {request.query}
          </blockquote>

          <h2>{question.title}</h2>
        </RichText>

        {question.answers.map((answer, idx) => (
          <div key={answer.title}>
            <FormItem
              type="radio"
              name={question.qid}
              label={answer.title}
              value={idx}
              checked={idx === request.answerIdx}
              onChange={() => {
                actions.selectAnswer(idx);
              }}
            />
          </div>
        ))}

        <Button
          size="big"
          isButtonElement
          disabled={request.answerIdx === null}
          onClick={actions.nextPage}
        >
          Next
        </Button>
      </Constrain>
    </PageTemplate>
  );
}

export default Question;
