import React from 'react';
import PropTypes from 'prop-types';

/**
 * @param {import('prop-types').InferProps<typeof Question>} props
 */
function Question({ children, isSubQuestion }) {
  return (
    <div className={`w-component-question${isSubQuestion ? ' w-component-question--sub' : ''}`}>
      {children}
    </div>
  );
}

Question.propTypes = {
  children: PropTypes.node,
  isSubQuestion: PropTypes.bool,
};

export default Question;
