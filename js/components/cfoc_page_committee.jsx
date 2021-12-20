import React from 'react';
import PropTypes from 'prop-types';

const CFOCPageCommitteeComponent = (props) => {
  const { title, body } = props;
  return (
    <div className="cfoc-page-committee">
      {
        !title
          ? null
          : (
            <h2>{title}</h2>
          )
      }
      {
        !body
          ? null
          : (
            <article dangerouslySetInnerHTML={{ __html: body }} />
          )
      }
    </div>
  );
};

CFOCPageCommitteeComponent.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
};

CFOCPageCommitteeComponent.defaultProps = {
  title: '',
  body: '',
};

export default CFOCPageCommitteeComponent;
