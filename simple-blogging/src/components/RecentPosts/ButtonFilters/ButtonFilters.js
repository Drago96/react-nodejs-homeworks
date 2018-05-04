import React from "react";
import PropTypes from "prop-types";

import Button from "../../UI/Button/Button";
import "./ButtonFilters.css";

const buttonFilters = props => (
  <div className="Filters">
    <p> Filter By: </p>
    <Button btnType={props.filter === "all" ? "Success" : "Danger"} clicked={() => props.filterPosts("all")}>ALL</Button>
    <Button btnType={props.filter === "active" ? "Success" : "Danger"} clicked={() => props.filterPosts("active")}>
      ACTIVE
    </Button>
    <Button btnType={props.filter === "inactive" ? "Success" : "Danger"} clicked={() => props.filterPosts("inactive")}>
      INACTIVE
    </Button>
  </div>
);

buttonFilters.propTypes = {
    filter: PropTypes.string.isRequired,
    filterPosts: PropTypes.func.isRequired
};

export default buttonFilters;
