import React, { Fragment, useState } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { useWizard } from '../stores/wizard_store';
import WizardHtml from './wizard_html';

Modal.setAppElement('#wizard-react-app');

/** @type {{content:React.CSSProperties, overlay:React.CSSProperties}} */
const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '100rem',
  },
  overlay: {
    backgroundColor: '#122e51cc',
  },
};

function Init() {
  const {
    actions, allTopics, ready, loading,
  } = useWizard();

  const [query, setQuery] = useState(/** @type string | null */ null);
  const [selectedTopic, setSelectedTopic] = useState(/** @type WizardTopic | null */ null);
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  if (!ready || !allTopics) {
    return <div>Loading app...</div>;
  }

  // Modal has all topics, but the page is limited to 10...
  const displayedTopics = allTopics.slice(0, 10);
  if (selectedTopic && !displayedTopics.find((t) => t.tid === selectedTopic.tid)) {
    // ...and must include the selected topic
    displayedTopics.pop();
    displayedTopics.push(selectedTopic);
  }

  const isTopicSelected = (topic) => selectedTopic && (selectedTopic.tid === topic.tid);

  function onClickTopicButton(topic) {
    setSelectedTopic(isTopicSelected(topic) ? null : topic);
  }

  return (
    <div>
      <p>
        <a href="#" aria-label="Go to previous page of wizard" tabIndex={0} style={{ color: '#fff' }} onClick={actions.prevPage}>
          <svg className="usa-icon" aria-hidden="true" focusable="false" role="img">
            <use xlinkHref="/img/uswds-3.2.0-sprite.svg#navigate_before" />
          </svg>
          {' '}
          Back
        </a>
      </p>

      <WizardHtml mid="intro1" />

      <label htmlFor="user-query" className="visually-hidden">Query</label>
      <input
        id="user-query"
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type 1-2 sentences or keywords..."
        value={query || ''}
      />

      <div style={{ margin: '2rem 0' }}>
        Common topics
        {' '}
        <TopicsButtons
          topics={displayedTopics}
          isTopicSelected={isTopicSelected}
          onClickTopicButton={onClickTopicButton}
        />
        {allTopics.length > 10 ? (
          <button onClick={openModal} className="button-as-link" style={{ color: '#fff' }}>
            See all
          </button>
        ) : null}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="All topics"
      >
        <div style={{ textAlign: 'right' }}>
          <button
            onClick={closeModal}
            className="close-button"
            aria-label="Close Modal"
          />
        </div>
        <TopicsButtons
          topics={allTopics}
          isTopicSelected={isTopicSelected}
          onClickTopicButton={onClickTopicButton}
        />
      </Modal>

      <p>
        {(query && query !== '') || selectedTopic ? (
          <button
            type="button"
            className="usa-button"
            onClick={() => actions.submitRequest({
              query: query || '',
              topic: selectedTopic,
            })}
          >
            Submit
          </button>
        ) : null}
        {loading && ' Loading...'}
      </p>
    </div>
  );
}

/**
 * @param {Object} props
 * @param {WizardTopic[]} props.topics
 * @param {(topic: WizardTopic) => boolean} props.isTopicSelected
 * @param {(topic: WizardTopic) => void} props.onClickTopicButton
 * @returns {React.ReactNode}
 */
function TopicsButtons({ topics, isTopicSelected, onClickTopicButton }) {
  if (topics && topics.length) {
    return (
      <>
        {topics.map((topic) => (
          <button
            key={topic.tid}
            className="wizard-topic-button"
            data-selected={Number(isTopicSelected(topic))}
            type="button"
            onClick={() => onClickTopicButton(topic)}
          >
            {topic.title}
          </button>
        ))}
      </>
    );
  }

  return null;
}

TopicsButtons.propTypes = {
  topics: PropTypes.array.isRequired,
  isTopicSelected: PropTypes.func.isRequired,
  onClickTopicButton: PropTypes.func.isRequired,
};

export default Init;
