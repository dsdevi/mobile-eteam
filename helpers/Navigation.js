import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Details from "../screens/Details";
import LogIn from "../screens/LogIn";

const LogInNav = createStackNavigator({
  LogIn: LogIn,
});

const UserNav = createStackNavigator({
  Details: Details,
});

const MainNav = createSwitchNavigator({
  LogInNav: LogInNav,
  UserNav: UserNav,
});

export default createAppContainer(MainNav);
