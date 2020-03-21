import React from "react";

const OptionButtons = props => {
  return (
    <div className="radio-buttons">
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          id="firstRadio"
          onChange={() => props.onRadioButtonChange("/api/products/1")}
          checked={props.selected === "/api/products/1"}
        />
        <label className="form-check-label" htmlFor="firstRadio">
          Start using '/api/products/1'
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          id="secondRadio"
          onChange={() => props.onRadioButtonChange("/api/products/a")}
          checked={props.selected === "/api/products/a"}
        />
        <label className="form-check-label" htmlFor="secondRadio">
          Start from '/api/products/a'
        </label>
      </div>
    </div>
  );
};

export default OptionButtons;
