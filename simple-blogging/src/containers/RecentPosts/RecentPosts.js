import React, { Component, Fragment } from "react";

import PostDetails from "../../components/PostDetails/PostDetails";
import ButtonFilters from "../../components/RecentPosts/ButtonFilters/ButtonFilters";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios";

class RecentPosts extends Component {
  state = {
    allPosts: null,
    posts: null,
    loading: true,
    filter: "all"
  };

  get allPosts() {
    return this._allPosts;
  }

  set allPosts(value) {
    this._allPosts = value;
  }

  async componentDidMount() {
    try {
      const response = await axios.get(
        `/posts.json?orderBy="createdAt"&limitToLast=15`
      );
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

      this.allPosts = posts;

      this.setState({ loading: false, posts: [...posts] });
    } catch (e) {}
  }

  filterPosts = filter => {
    let posts;
    if (filter === "all") {
      posts = this.allPosts.map(p => p);
    } else {
      posts = this.allPosts.filter(p => p.status === filter);
    }

    this.setState({ posts, filter });
  };

  render() {
    if (this.state.loading) {
      return <Spinner />;
    }

    return (
      <Fragment>
        <ButtonFilters filter={this.state.filter} filterPosts={this.filterPosts} />
        <hr />
        {this.state.posts.map(p => <PostDetails key={p.id} post={p} />)}
      </Fragment>
    );
  }
}

export default RecentPosts;
