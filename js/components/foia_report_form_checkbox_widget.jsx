import React from 'react';
import PropTypes from 'prop-types';

function FoiaReportFormCheckboxWidget(props) {
  return (
    <div>
      <input
        type="checkbox"
        name={props.value}
        id={props.value}
        value={props.value}
        checked={props.checked}
        onChange={props.onChange}
      />
      <label htmlFor={props.value}>{props.options.label || props.value}</label>
    </div>
  );
}

FoiaReportFormCheckboxWidget.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool,
  options: PropTypes.shape({
    label: PropTypes.string,
  }),
};

FoiaReportFormCheckboxWidget.defaultProps = {
  checked: false,
  options: { label: '' },
};

export default FoiaReportFormCheckboxWidget;
