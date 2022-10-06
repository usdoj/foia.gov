import React from 'react';
import PropTypes from 'prop-types';

function CFOCPageCommitteeWorkGroupComponent(props) {
  const { title, body } = props;
  let workgroupId = (Math.floor(Math.random() * 10000000000000));
  workgroupId = `workgroup-${workgroupId}`;
  return (
    <ul className="cfoc-committee-workgroup usa-accordion">
      <li>
        <button className="usa-accordion-button" aria-controls={workgroupId} aria-expanded="false">
          { title }
        </button>
        <div id={workgroupId} className="usa-accordion-content">
          {
            !body
              ? null
              : (
                <article dangerouslySetInnerHTML={{ __html: props.body }} />
              )
          }
        </div>
      </li>
    </ul>
  );
}

CFOCPageCommitteeWorkGroupComponent.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
};

CFOCPageCommitteeWorkGroupComponent.defaultProps = {
  title: '',
  body: '',
};

export default CFOCPageCommitteeWorkGroupComponent;
