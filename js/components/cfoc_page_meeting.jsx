import React from 'react';
import PropTypes from 'prop-types';
import CFOCPageMeetingDocumentsComponent from './cfoc_page_meeting_documents';
import CFOCPageMeetingMaterialsComponent from './cfoc_page_meeting_materials';

const CFOCPageMeetingComponent = props => (
  <div className="cfoc-page-meeting">
    {
      !props.title
        ? null
        : (
          <h2>{props.title}</h2>
        )
    }
    {
      !props.body
        ? null
        : (
          <article dangerouslySetInnerHTML={{ __html: props.body }} />
        )
    }
    {
      props.documents.length
        ? (
          <div className="cfoc-page-meeting-document-links">
            {
              props.documents.map((document, index) => {
                const key = document.item_title.length * index;
                return (
                  <p key={key}>
                    <CFOCPageMeetingDocumentsComponent
                      title={document.item_title}
                      link={document.item_link}
                      key={key}
                    />
                  </p>
                );
              })
            }
          </div>
        )
        : null
    }

    {
      props.materials.length
        ? (
          <div className="cfoc-page-meeting-materials">
            <p>Meeting Materials</p>
            <ul>
              {
                props.materials.map((material, index) => {
                  const key = material.item_title.length * index;
                  return (
                    <li key={key}>
                      <CFOCPageMeetingMaterialsComponent
                        title={material.item_title}
                        link={material.item_link}
                        key={key}
                      />
                    </li>
                  );
                })
              }
            </ul>
          </div>
        )
        : null
    }
  </div>
);

CFOCPageMeetingComponent.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  documents: PropTypes.array,
  document: PropTypes.shape({
    item_title: PropTypes.string,
    item_link: PropTypes.string,
  }),
  materials: PropTypes.array,
  material: PropTypes.shape({
    item_title: PropTypes.string,
    item_link: PropTypes.string,
  }),
};

CFOCPageMeetingComponent.defaultProps = {
  title: '',
  body: '',
  documents: [],
  document: {
    item_title: '',
    item_link: '',
  },
  materials: [],
  material: {
    item_title: '',
    item_link: '',
  },
};

export default CFOCPageMeetingComponent;
