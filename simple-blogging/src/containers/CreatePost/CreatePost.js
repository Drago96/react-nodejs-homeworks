import React, { Component } from "react";
import PropTypes from "prop-types";

import PostForm from "../../components/PostForm/PostForm";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios";

class CreatePost extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };

  state = {
    loading: false
  };

  formRef = React.createRef();

  blogCreateHandler = async event => {
    event.preventDefault();

    const formData = {};

    for (const formElementIdentifier in this.formRef.current.state.postForm) {
      if (this.formRef.current.state.postForm.hasOwnProperty(formElementIdentifier)) {
        formData[formElementIdentifier] = this.formRef.current.state.postForm[
          formElementIdentifier
        ].value;
      }
    }

    formData.tags = formData.tags.split(" ");
    formData.createdAt = new Date().getTime();

    this.setState({ loading: true });
    try {
      await axios.post("/posts.json", formData);
      this.props.history.push("/posts");
    } catch (e) {
      this.setState({ loading: false });
    }
  };

  render() {
    let form = (
      <PostForm
        ref={this.formRef}
        values={{
          author: "",
          imageUrl: "",
          tags: "",
          text: "",
          status: "",
          title: ""
        }}
        action="CREATE"
        title="CREATE POST"
        onSubmit={this.blogCreateHandler}
      />
    );

    if (this.state.loading) {
      form = <Spinner />;
    }

    return form;
  }
}

export default CreatePost;
