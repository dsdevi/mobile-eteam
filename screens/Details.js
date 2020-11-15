import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

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

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Signed in!</Text>
    </View>
  );
};

Details.navigationOptions = (navData) => {
  return {
    headerTitle: "User Details",
    //logout button
    // headerRight: () => (
    //   <Button
    //     title="Go Back"
    //     onPress={() => navData.navigation.navigate("LogInNav")}
    //   />
    // ),
  };
};

export default Details;
