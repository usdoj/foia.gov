import React from 'react';
import PropTypes from 'prop-types';

function QuarterlyReportFormCheckboxWidget(props) {
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
      <label htmlFor={props.value} className="touch-safe">{props.options.label || props.value}</label>
    </div>
  );
}

QuarterlyReportFormCheckboxWidget.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool,
  options: PropTypes.shape({
    label: PropTypes.string,
  }),
};

QuarterlyReportFormCheckboxWidget.defaultProps = {
  checked: false,
  options: { label: '' },
};

export default QuarterlyReportFormCheckboxWidget;
