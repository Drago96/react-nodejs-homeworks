import React, { Component } from "react";
import PropTypes from "prop-types";

import PostForm from "../../components/PostForm/PostForm";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios";

class EditPost extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
  };

  state = {
    post: null,
    loading: true
  };

  async componentDidMount() {
    const postId = this.props.match.params.postId;

    try {
      const { data } = await axios.get(`/posts/${postId}.json`);
      if (!data) {
        this.props.history.push("/posts");
      }
      this.setState({ post: data, loading: false });
    } catch (e) {
      this.props.history.push("/posts");
    }
  }

  formRef = React.createRef();

  blogEditHandler = async event => {
    event.preventDefault();

    const formData = {};

    for (const formElementIdentifier in this.formRef.current.state.postForm) {
      if (
        this.formRef.current.state.postForm.hasOwnProperty(
          formElementIdentifier
        )
      ) {
        formData[formElementIdentifier] = this.formRef.current.state.postForm[
          formElementIdentifier
        ].value;
      }
    }

    formData.tags = formData.tags.split(" ");
    formData.createdAt = this.state.post.createdAt;

    this.setState({ loading: true });
    try {
      await axios.put(
        `/posts/${this.props.match.params.postId}.json`,
        formData
      );
      this.props.history.push("/posts");
    } catch (e) {
      this.setState({ loading: false });
    }
  };

  render() {
    let form = <Spinner />;

    if (!this.state.loading) {
      form = (
        <PostForm
          ref={this.formRef}
          values={{
            author: this.state.post.author,
            imageUrl: this.state.post.imageUrl,
            tags: this.state.post.tags.join(" "),
            text: this.state.post.text,
            status: this.state.post.status,
            title: this.state.post.title
          }}
          action="EDIT"
          title="EDIT POST"
          onSubmit={this.blogEditHandler}
        />
      );
    }

    return form;
  }
}

export default EditPost;
