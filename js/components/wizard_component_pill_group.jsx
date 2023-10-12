import React from 'react';
import PropTypes from 'prop-types';
import Pill from './wizard_component_pill';
import Heading from './wizard_component_heading';

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
          <Heading tag="h2" className="w-component-pill-group__label">{label}</Heading>
        )}
        <ul className="w-component-pill-group__list">
          {topics.map((topic) => (
            <li key={topic.tid}>
              <Pill
                selected={Number(isTopicSelected(topic))}
                onClick={() => onClickTopicButton(topic)}
              >
                {topic.title}
              </Pill>
            </li>
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
