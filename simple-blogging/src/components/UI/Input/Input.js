import React from "react";
import PropTypes from "prop-types";

import "./Input.css";

const input = props => {
  let inputElement = null;
  const inputClasses = ["InputElement"];

  if (props.invalid && props.shouldValidate) {
    inputClasses.push("Invalid");
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "radio":
      inputElement = props.elementConfig.options.map(o => (
        <div className="Radio" key={o.value}>
          <input className="Radio" name={props.elementConfig.name} onChange={props.changed} id={o.value} value={o.value} type="radio" />
          <label htmlFor={o.value}>{o.displayValue}</label>
        </div>
      ));
      break;
    case "select":
      inputElement = (
        <select
          className={inputClasses.join(" ")}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map(o => (
            <option key={o.value} value={o.value}>
              {o.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
  }

  return (
    <div className="Input">
      <label className="Label">{props.label}</label>
      {inputElement}
    </div>
  );
};

input.propTypes = {
  invalid: PropTypes.bool.isRequired,
  shouldValidate: PropTypes.bool.isRequired,
  label: PropTypes.string,
  elementConfig: PropTypes.object.isRequired,
  elementType: PropTypes.string,
  value: PropTypes.any,
  changed: PropTypes.func.isRequired
};

export default input;
