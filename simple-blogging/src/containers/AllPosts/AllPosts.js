import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import axios from "../../axios";

import Spinner from "../../components/UI/Spinner/Spinner";
import PostDetails from "../../components/PostDetails/PostDetails";
import ButtonActions from "../../components/AllPosts/ButtonActions/ButtonActions";

class AllPosts extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };

  state = {
    loading: true,
    posts: null
  };

  async componentDidMount() {
    try {
      const response = await axios.get("/posts.json");
      const posts = [];

      for (const key in response.data) {
        if (response.data.hasOwnProperty(key)) {
          posts.push({
            id: key,
            ...response.data[key],
            createdAt: new Date(+response.data[key].createdAt)
          });
        }
      }
      posts.reverse();

      this.setState({ loading: false, posts });
    } catch (e) {}
  }

  editPost = postId => {
    this.props.history.push(`/posts/edit/${postId}`);
  };

  deletePost = async postId => {
    try {
      console.log(postId);
      console.log(this.state.posts);
      const posts = this.state.posts.filter(p => p.id !== postId);
      this.setState({ posts });

      await axios.delete(`/posts/${postId}.json`);
    } catch (e) {}
  };

  render() {
    if (this.state.loading) {
      return <Spinner />;
    }

    return this.state.posts.map(p => (
      <Fragment key={p.id}>
        <PostDetails post={p} />
        <ButtonActions
          postId={p.id}
          editPost={this.editPost}
          deletePost={this.deletePost}
        />
      </Fragment>
    ));
  }
}

export default AllPosts;
