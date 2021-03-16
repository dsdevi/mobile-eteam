import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Colours from "../constants/colours";
import Details from "../screens/Details";
import LogIn from "../screens/LogIn";
import Report from "../screens/Report";

defaultNavOptions = {
  headerStyle: { backgroundColor: Colours.main },
};

const LogInNav = createStackNavigator(
  {
    LogIn: LogIn,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const UserNav = createStackNavigator(
  {
    Details: Details,
    Report: Report,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const MainNav = createSwitchNavigator(
  {
    LogInNav: LogInNav,
    UserNav: UserNav,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

export default createAppContainer(MainNav);
