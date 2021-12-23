import React from 'react';
import PropTypes from 'prop-types';

const CFOCPageAttachmentsComponent = (props) => {
  const { attachments } = props;
  return (
    <div className="cfoc-attachments">
      {
        attachments.map((attachment, index) => {
          const key = index + 1;
          return (
            <a className="usa-button usa-button-primary-alt" href={attachment.attachment_file} rel="noopener noreferrer" target="_blank" key={key}>
              {attachment.attachment_title}
              <span />
            </a>
          );
        })
      }
    </div>
  );
};


CFOCPageAttachmentsComponent.propTypes = {
  attachments: PropTypes.array,
  attachment: PropTypes.shape({
    attachment_title: PropTypes.string,
    attachment_file: PropTypes.string,
  }),
};

CFOCPageAttachmentsComponent.defaultProps = {
  attachments: [],
  attachment: {},
};

export default CFOCPageAttachmentsComponent;
