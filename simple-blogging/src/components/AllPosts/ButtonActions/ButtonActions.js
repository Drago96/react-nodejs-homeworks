import React from "react";
import PropTypes from "prop-types";

import Button from "../../UI/Button/Button";
import "./ButtonActions.css";

const buttonFilters = props => (
  <div className="Actions">
    <Button btnType="Success" clicked={() => props.editPost(props.postId)}>
      EDIT
    </Button>
    <Button btnType="Danger" clicked={() => props.deletePost(props.postId)}>
      DELETE
    </Button>
  </div>
);

buttonFilters.propTypes = {
  deletePost: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired
};

export default buttonFilters;
