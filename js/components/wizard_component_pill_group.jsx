import React from 'react';
import PropTypes from 'prop-types';
import Pill from './wizard_component_pill';

/**
 * @param {Object} props
 * @param {string=} props.label
 * @param {WizardTopic[]} props.topics
 * @param {(topic: WizardTopic) => boolean} props.isTopicSelected
 * @param {React.ReactNode=} props.suffix
 * @param {(topic: WizardTopic) => void} props.onClickTopicButton
 * @returns {React.ReactNode}
 */
function PillGroup({
  label,
  topics,
  suffix,
  isTopicSelected,
  onClickTopicButton,
}) {
  if (topics && topics.length) {
    return (
      <div className="w-component-pill-group">
        {label && (
          <div className="w-component-pill-group__label">{label}</div>
        )}
        <ul className="w-component-pill-group__list">
          {topics.map((topic) => (
            <Pill
              key={topic.tid}
              selected={Number(isTopicSelected(topic))}
              onClick={() => onClickTopicButton(topic)}
            >
              {topic.title}
            </Pill>
          ))}
        </ul>
        {suffix}
      </div>
    );
  }

  return null;
}

PillGroup.propTypes = {
  label: PropTypes.string,
  topics: PropTypes.array.isRequired,
  suffix: PropTypes.node,
  isTopicSelected: PropTypes.func.isRequired,
  onClickTopicButton: PropTypes.func.isRequired,
};

export default PillGroup;
