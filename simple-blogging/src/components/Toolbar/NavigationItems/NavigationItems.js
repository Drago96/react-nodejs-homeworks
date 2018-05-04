import React from "react";

import NavigationItem from "./NavigationItem/NavigationItem";
import "./NavigationItems.css";

const navigationItems = props => (
  <ul className="NavigationItems">
    <NavigationItem link="/posts">All Posts</NavigationItem>
    <NavigationItem link="/posts/recent">Recent Posts</NavigationItem>
    <NavigationItem link="/posts/create">Create Post</NavigationItem>
  </ul>
);

export default navigationItems;
