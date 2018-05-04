import React from "react";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";

import "./PostDetails.css";

const postDetails = props => {
  const tags = props.post.tags.join(", ");

  return (
    <div className="PostDetails">
      <h1> {props.post.title} </h1>
      <ReactMarkdown source={props.post.text.substring(0, 150)} />
      <hr />
      <p>Tags: {tags ? tags : "none"}</p>
      <p>
        Created by {props.post.author} on {props.post.createdAt.toGMTString()}
      </p>
    </div>
  );
};

postDetails.propTypes = {
  post: PropTypes.object.isRequired
};

export default postDetails;