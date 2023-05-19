import React, { useState } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { useWizard } from '../stores/wizard_store';

Modal.setAppElement('#wizard-react-app');
const customStyles = {
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
    actions, allTopics, ready, loading, ui,
  } = useWizard();

  const [query, setQuery] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  if (!ready) {
    return <div>Loading app...</div>;
  }

  // displayed topics list will be derived from allTopics and whatever the current topic is set to
  const displayedTopics = allTopics.slice(0, 10);
  if (selectedTopic && !displayedTopics.find((t) => t.tid === selectedTopic.tid)) {
    displayedTopics.pop();
    displayedTopics.push(selectedTopic);
  }

  const isTopicSelected = (topic) => selectedTopic && selectedTopic.tid === topic.tid;

  function onClickTopicButton(topic) {
    if (isTopicSelected(topic)) {
      setSelectedTopic(null);
    } else {
      setSelectedTopic(topic);
    }
  }

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: ui.intro1 || '' }} />

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
        style={customStyles}
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
            onClick={() => actions.submitRequest({
              query: query || '',
              topics: selectedTopic,
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
  } return null;
}

TopicsButtons.propTypes = {
  topics: PropTypes.array,
  isTopicSelected: PropTypes.func,
  onClickTopicButton: PropTypes.func,
};

export default Init;
