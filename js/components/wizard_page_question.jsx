import React from 'react';
import { useWizard } from '../stores/wizard_store';

function Question() {
  const {
    actions, canGoBack, request,
  } = useWizard();

  const { question } = request || {};

  if (!request || !question) {
    return null;
  }

  return (
    <div>
      <p>One more question about:</p>

      <blockquote>
        {request.query}
      </blockquote>

      <h2>{question.title}</h2>

      {question.answers.map((answer, idx) => {
        const inputId = `question-${question.qid}-${idx}`;
        return (
          <div key={answer.title}>
            <input
              type="radio"
              name={question.qid}
              value={idx}
              id={inputId}
              checked={idx === request.answerIdx}
              onChange={() => {
                actions.selectAnswer(idx);
              }}
            />
            <label htmlFor={inputId}>
              {answer.title}
            </label>
          </div>
        );
      })}

      <p>
        {canGoBack && (
          <button
            type="button"
            className="usa-button"
            onClick={actions.prevPage}
          >
            Back
          </button>
        )}
        <button
          type="button"
          className="usa-button"
          disabled={request.answerIdx === null}
          onClick={actions.nextPage}
        >
          Next
        </button>
      </p>
    </div>
  );
}

export default Question;
