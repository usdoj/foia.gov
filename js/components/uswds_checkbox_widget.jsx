import React from 'react';
const USWDSCheckboxWidget = function(props) {
  return (
    <div>
      <input 
        type="checkbox" 
        id={props.label} 
        name={props.label} 
        className={props.value ? "checked" : "unchecked"} 
        onClick={() => props.onChange(!props.value)} 
      />
      <label htmlFor={props.label}>{props.options.title}</label>
    </div>
  );
};
export default USWDSCheckboxWidget;
