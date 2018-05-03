import React from "react";

import NavigationItem from "./NavigationItem/NavigationItem";
import "./NavigationItems.css";

const navigationItems = props => (
  <ul className="NavigationItems">
    <NavigationItem link="/posts/create">Create Post</NavigationItem>
    <NavigationItem link="/posts/recent">Recent Posts</NavigationItem>
  </ul>
);

export default navigationItems;
