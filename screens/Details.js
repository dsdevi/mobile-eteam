import { View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { HeaderButtons, Item } from "react-navigation-header-buttons";

import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

import * as eTeamActions from "../helpers/eTeam-actions";
import CustomHeaderButton from "../components/CustomHeaderButton";

const Details = (props) => {
  //const [pushToken, setPushToken] = useState();
  useEffect(() => {
    Permissions.getAsync(Permissions.NOTIFICATIONS)
      .then((statusObj) => {
        if (statusObj.status !== "granted") {
          return Permissions.askAsync(Permissions.NOTIFICATIONS);
        }
        return statusObj;
      })
      .then((statusObj) => {
        if (statusObj.status !== "granted") {
          throw new Error("Permission not granted");
        }
      })
      .then(() => {
        return Notifications.getExpoPushTokenAsync();
      })
      .then((response) => {
        const token = response.data;
        console.log(token);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const backgroundSubscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response);
      }
    );

    const foregroundSubscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log(notification);
      }
    );

    return () => {
      backgroundSubscription.remove();
      foregroundSubscription.remove();
    };
  }, []);

  const test = () => {
    const token = useSelector((state) => state.eteam.token);
    console.log(token);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Signed in!</Text>
    </View>
  );
};

Details.navigationOptions = (navData) => {
  return {
    headerRight: () => {
      const token = useSelector((state) => state.eTeam.token);
      const dispatch = useDispatch();
      const logout = async () => {
        try {
          await dispatch(eTeamActions.logout(token));
          navData.navigation.navigate("LogInNav");
        } catch (err) {
          console.log("Error in Home Screen Driver Log Out");
          console.log(err);
        }
      };
      return (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="log-out"
            iconName="md-log-out"
            onPress={() => {
              Alert.alert("Log Out", "Sure you want to log out?", [
                { text: "Yes", onPress: logout },
                { text: "No" },
              ]);
            }}
          />
        </HeaderButtons>
      );
    },
  };
};

export default Details;
