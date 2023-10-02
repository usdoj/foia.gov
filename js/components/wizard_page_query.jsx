import React, { useEffect, useState } from 'react';
import { useWizard } from '../stores/wizard_store';
import WizardHtml from './wizard_html';
import PillGroup from './wizard_component_pill_group';
import PageTemplate from './wizard_template_page';
import FormItem from './wizard_component_form_item';
import Modal from './wizard_component_modal';
import Constrain from './wizard_layout_constrain';
import Button from './wizard_component_button';
import Heading from './wizard_component_heading';

const MAX_QUERY_LENGTH = 500;

function Query() {
  const {
    actions, allTopics,
  } = useWizard();

  const [query, setQuery] = useState(/** @type string | null */ null);
  const [exceededMaxLengthQuery, setExceededMaxLengthQuery] = useState(/** @type boolean */ false);
  const [selectedTopic, setSelectedTopic] = useState(/** @type WizardTopic | null */ null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    if (query && query !== '' && query.length > MAX_QUERY_LENGTH) {
      setExceededMaxLengthQuery(true);
    } else {
      setExceededMaxLengthQuery(false);
    }
  }, [query, MAX_QUERY_LENGTH]);

  // Modal has all topics, but the page is limited to 10...
  const displayedTopics = allTopics.slice(0, 10);
  if (selectedTopic && !displayedTopics.find((t) => t.tid === selectedTopic.tid)) {
    // ...and must include the selected topic
    displayedTopics.pop();
    displayedTopics.push(selectedTopic);
  }

  const isTopicSelected = (topic) => selectedTopic && (selectedTopic.tid === topic.tid);

  function onClickTopicButton(topic) {
    setQuery('');
    setSelectedTopic(isTopicSelected(topic) ? null : topic);
  }

  const submitButton = (
    <div className="w-component-submit">
      <Button
        onClick={() => {
          setSubmitted(true);
          actions.submitRequest({
            query: query || '',
            topic: selectedTopic,
          });
        }}
        disabled={submitted}
      >
        Submit
      </Button>
      {submitted && <WizardHtml mid="loading" />}
    </div>
  );

  return (
    <PageTemplate>
      <Constrain>
        <WizardHtml mid="query_slide_1" />
        <PillGroup
          label="Select a common topic"
          topics={displayedTopics}
          isTopicSelected={isTopicSelected}
          onClickTopicButton={onClickTopicButton}
          suffix={allTopics.length > 10 ? (
            <button onClick={openModal} className="button-as-link" style={{ color: '#fff' }}>
              See all
            </button>
          ) : null}
        />
        <Modal
          title="Common topics"
          contentLabel="All topics"
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
        >
          <PillGroup
            topics={allTopics}
            isTopicSelected={isTopicSelected}
            onClickTopicButton={onClickTopicButton}
          />
        </Modal>
        {selectedTopic ? submitButton : null}

        <div style={{
          opacity: selectedTopic ? 0.5 : 1,
          transition: 'opacity 1s',
          paddingTop: '2rem',
        }}
        >
          <Heading tag="h2">Or search for something else</Heading>
          <WizardHtml mid="query_slide_2" />

          {exceededMaxLengthQuery && <p style={{ color: 'white' }}>Query is limited to 500 characters</p>}
          <FormItem
            type="textarea"
            isLabelHidden
            label="Query"
            onChange={(e) => setQuery(e.target.value)}
            value={query || ''}
            disabled={Boolean(selectedTopic)}
          />

          {(query && query !== '' && !exceededMaxLengthQuery) ? submitButton : null}
        </div>
      </Constrain>
    </PageTemplate>
  );
}

export default Query;
