import React from 'react';
import PropTypes from 'prop-types';

function USWDSCheckboxWidget(props) {
  return (
    <div>
      <input
        type="checkbox"
        id={props.label}
        name={props.label}
        className={props.value ? 'checked' : 'unchecked'}
        onChange={() => props.onChange(!props.value)}
      />
      <label htmlFor={props.label}>{props.options.title}</label>
    </div>
  );
}

USWDSCheckboxWidget.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.shape({
    title: PropTypes.string,
  }),
};

USWDSCheckboxWidget.defaultProps = {
  value: '',
  onChange: () => {},
  options: { title: '' },
};

export default USWDSCheckboxWidget;
