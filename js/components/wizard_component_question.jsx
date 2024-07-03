import React from 'react';
import PropTypes from 'prop-types';

/**
 * @param {import('prop-types').InferProps<typeof Question>} props
 */
function Question({ children, isSubQuestion, notLegend }) {
  return notLegend ? (
    <div className={`w-component-question${isSubQuestion ? ' w-component-question--sub' : ''}`}>
      {children}
    </div>
  ) : (
    <legend className={`w-component-question${isSubQuestion ? ' w-component-question--sub' : ''}`}>
      {children}
    </legend>
  );
}

Question.propTypes = {
  children: PropTypes.node,
  isSubQuestion: PropTypes.bool,
  notLegend: PropTypes.bool,
};

export default Question;
