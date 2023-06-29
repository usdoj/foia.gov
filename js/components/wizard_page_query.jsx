import React, { useState } from 'react';
import { useWizard } from '../stores/wizard_store';
import WizardHtml from './wizard_html';
import PillGroup from './wizard_component_pill_group';
import PageTemplate from './wizard_template_page';
import FormItem from './wizard_component_form_item';
import Modal from './wizard_component_modal';
import Constrain from './wizard_layout_constrain';
import Button from './wizard_component_button';

function Query() {
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
    setQuery('');
    setSelectedTopic(isTopicSelected(topic) ? null : topic);
  }

  return (
    <PageTemplate>
      <Constrain>
        <WizardHtml mid="query_slide" />
        <FormItem
          type="textarea"
          isLabelHidden
          label="Query"
          onChange={(e) => setQuery(e.target.value)}
          value={query || ''}
          placeholder={selectedTopic ? '' : 'Type 1-2 sentences or keywords...'}
          disabled={Boolean(selectedTopic)}
        />
        <PillGroup
          label="Or choose a common topic"
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

        {(query && query !== '') || selectedTopic ? (
          <Button
            onClick={() => actions.submitRequest({
              query: query || '',
              topic: selectedTopic,
            })}
          >
            Submit
          </Button>
        ) : null}
        {loading && ' Loading...'}
      </Constrain>
    </PageTemplate>
  );
}

export default Query;
