import React from 'react';

const ToggleSwitch = ({ label, checked, onChange }) => {
  return (
    <div className="toggle-switch">
      <label>{label}</label>
      <label className="switch">
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default ToggleSwitch;