import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import { Route, Redirect, Switch } from "react-router-dom";

import CreatePost from "./containers/CreatePost/CreatePost";
import RecentPosts from "./containers/RecentPosts/RecentPosts";
import AllPosts from "./containers/AllPosts/AllPosts";
import EditPost from "./containers/EditPost/EditPost";

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route exact path="/posts/create" component={CreatePost} />
          <Route exact path="/posts/recent" component={RecentPosts} />
          <Route exact path="/posts/edit/:postId" component={EditPost} />
          <Route exact path="/posts" component={AllPosts} />
          <Redirect to="/posts" />
        </Switch>
      </Layout>
    );
  }
}

export default App;
