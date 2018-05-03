import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

import "./NavigationItem.css";

const navigationItem = props => (
  <li className="NavigationItem">
    <NavLink exact to={props.link}>
      {props.children}
    </NavLink>
  </li>
);

navigationItem.propTypes = {
  link: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default navigationItem;
