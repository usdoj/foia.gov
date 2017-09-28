import React from 'react';
function USWDSCheckboxWidget({ label, value }) {
  return (
    <div>
      <input 
        type="checkbox" 
        id={props.label} 
        name={props.label} 
        className={props.value ? "checked" : "unchecked"} 
        onChange={() => props.onChange(!props.value)} 
      />
      <label htmlFor={props.label}>{props.options.title}</label>
    </div>
  );
};
export default USWDSCheckboxWidget;
