import React from "react";
import PropTypes from "prop-types";

import "./Button.css";

const button = props => (
  <button
    className={["Button", props.btnType].join(" ")}
    onClick={props.clicked}
    disabled={props.disabled}
  >
    {props.children}
  </button>
);

button.propTypes = {
  btnType: PropTypes.string.isRequired,
  clicked: PropTypes.func,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool
};

export default button;
