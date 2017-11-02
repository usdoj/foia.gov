import React from 'react';
import PropTypes from 'prop-types';

function href(id) {
  // ids used by react-jsonschema-form
  return `#root_${id}__title`;
}

function ProgressBar({ sections }) {
  return (
    <ul className="sidebar_progress-bar">
      {
        sections.map(section => (
          <li key={section.id}>
            <a href={href(section.id)}>
              <span>{section.title}</span>
            </a>
          </li>
        ))
      }
      <li key="submit">
        <a href="#foia-request-form_submit">
          <span>Submission and confirmation</span>
        </a>
      </li>
    </ul>
  );
}

ProgressBar.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.object).isRequired,
};


export default ProgressBar;
