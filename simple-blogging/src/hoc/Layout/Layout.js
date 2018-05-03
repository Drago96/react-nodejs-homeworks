import React, { Fragment } from "react";
import PropTypes from "prop-types";

import Toolbar from "../../components/Toolbar/Toolbar";
import "./Layout.css";

const layout = props => (
  <Fragment>
    <Toolbar />
    <main className="Main">{props.children}</main>
  </Fragment>
);

layout.propTypes = {
    children: PropTypes.node.isRequired
};

export default layout;
