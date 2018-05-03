import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import { Route } from "react-router-dom";

import CreatePost from "./containers/CreatePost/CreatePost";
import RecentPosts from "./containers/RecentPosts/RecentPosts";

class App extends Component {
  render() {
    return (
      <Layout>
        <Route path="/posts/create" component={CreatePost} />
        <Route path="/posts/recent" component={RecentPosts} />
      </Layout>
    );
  }
}

export default App;
