import React from 'react';
import PropTypes from 'prop-types';

/**
 * @param {Object} props
 * @param {import('react').ReactNode=} props.children
 * @return {React.ElementType}
 */
function QuestionHead({ children }) {
  return (
    <div className="w-layout-question-head">
      {children}
    </div>
  );
}

QuestionHead.propTypes = {
  children: PropTypes.node.isRequired,
};

export default QuestionHead;
