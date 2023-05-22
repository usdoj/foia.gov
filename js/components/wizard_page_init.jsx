import React, { useState } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { useWizard } from '../stores/wizard_store';
import WizardHtml from './wizard_html';

Modal.setAppElement('#wizard-react-app');
const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
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

  const isTopicSelected = (topic) => selectedTopic && selectedTopic.tid === topic.tid;

  function onClickTopicButton(topic) {
    setSelectedTopic(isTopicSelected(topic) ? topic : null);
  }

  return (
    <div>
      <WizardHtml mid="intro1" />

      <label htmlFor="user-query">What information are you looking for?</label>
      <input
        id="user-query"
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type 1-2 sentences or keywords..."
        value={query || ''}
      />

      {allTopics && allTopics.length > 10 ? (
        <button onClick={openModal} className="button-as-link">
          See all
        </button>
      ) : null}

      <TopicsButtons
        topics={displayedTopics}
        isTopicSelected={isTopicSelected}
        onClickTopicButton={onClickTopicButton}
      />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="Example Modal"
      >
        <button
          onClick={closeModal}
          className="close-button"
          aria-label="Close Modal"
        />
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
            onClick={() => actions.submitRequest(query || '', selectedTopic)}
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
 * @param props
 * @param {WizardTopic[]} props.topics
 * @param {(topic: WizardTopic) => boolean} props.isTopicSelected
 * @param {(topic: WizardTopic) => void} props.onClickTopicButton
 * @returns {JSX.Element|null}
 */
function TopicsButtons({ topics, isTopicSelected, onClickTopicButton }) {
  if (topics && topics.length) {
    return (
      <div>
        {topics.map((topic) => (
          <button
            key={topic.tid}
            className={isTopicSelected(topic) ? 'usa-button-primary-alt' : ''}
            type="button"
            onClick={() => onClickTopicButton(topic)}
          >
            {topic.label}
          </button>
        ))}
      </div>
    );
  }

  return null;
}

TopicsButtons.propTypes = {
  topics: PropTypes.array,
  isTopicSelected: PropTypes.func,
  onClickTopicButton: PropTypes.func,
};

export default Init;
