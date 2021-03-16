import { View, Text, Alert, StyleSheet, Switch } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { HeaderButtons, Item } from "react-navigation-header-buttons";

import * as Notifications from "expo-notifications";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import * as eTeamActions from "../helpers/eTeam-actions";
import CustomHeaderButton from "../components/CustomHeaderButton";
import { Card, Button, Icon } from "react-native-elements";
import { Linking } from "react-native";
import Colours from "../constants/colours";

const Details = (props) => {
  //const [pushToken, setPushToken] = useState();
  const name = useSelector((state) => state.eTeam.name);
  // const username = useSelector((state) => state.eTeam.username);
  const contactNumber = useSelector((state) => state.eTeam.contactNumber);
  const availability = useSelector((state) => state.eTeam.availability);
  const token = useSelector((state) => state.eTeam.token);
  const dispatch = useDispatch();
  const [emergency, setEmergency] = useState(false);
  const [emergencyLat, setEmergencyLat] = useState();
  const [emergencyLng, setEmergencyLng] = useState();
  const [emergencyType, setEmergencyType] = useState();

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
        console.log("This is from the background");
        // console.log(response.notification.request.content.data);
        const title = response.notification.request.content.title;
        const data = response.notification.request.content.data;

        if (title === "EMERGENCY") {
          setEmergency(true);
          setEmergencyLat(data.lat);
          setEmergencyLng(data.lng);
          setEmergencyType(data.type);
        }
      }
    );

    const foregroundSubscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Notif while in app");
        const title = notification.request.content.title;
        const data = notification.request.content.data;

        if (title === "EMERGENCY") {
          setEmergency(true);
          setEmergencyLat(data.lat);
          setEmergencyLng(data.lng);
          setEmergencyType(data.type);
          console.log(data.type);
        }

        // console.log(notification.request.content.data);
      }
    );

    return () => {
      backgroundSubscription.remove();
      foregroundSubscription.remove();
    };
  }, []);

  const verifyPermissions = async () => {
    const getStatus = await Permissions.getAsync(Permissions.LOCATION);
    if (getStatus.status === "granted") {
      return;
    }

    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions",
        "You need to grant location permissions to set location",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const clearEmergency = () => {
    setEmergency(false);
    setEmergencyLat(null);
    setEmergencyLng(null);
  };

  const getLocation = async () => {
    verifyPermissions();

    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });
      console.log(
        JSON.stringify({
          sessionToken: token,
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        })
      );
      await dispatch(
        eTeamActions.setLocation(
          token,
          location.coords.latitude,
          location.coords.longitude
        )
      );
      Alert.alert("Location Set!", "Location was successfully set", [
        { text: "Okay" },
      ]);
    } catch (err) {
      console.log("Details getLocation error");
      console.log(err);
    }
  };

  const toggle = async (newValue) => {
    try {
      //await dispatch(eTeamActions.toggle(username));
      await dispatch(eTeamActions.availability(token, newValue));
    } catch (err) {
      console.log("Details toggle function error");
      console.log(err);
    }
  };

  const openInMaps = async () => {
    await Linking.openURL(
      `https://www.google.com/maps?q=${emergencyLat},${emergencyLng}`
    );
  };

  return (
    <View>
      {!emergency && (
        <Card>
          <Card.Title style={styles.detailText}>Team Info</Card.Title>
          <Card.Divider></Card.Divider>
          <View style={styles.detailTextContainer}>
            <Text style={styles.detailText}>Name</Text>
            <Text style={styles.detailText}>{name}</Text>
          </View>
          <View style={styles.detailTextContainer}>
            <Text style={styles.detailText}>Contact</Text>
            <Text style={styles.detailText}>{contactNumber}</Text>
          </View>
          <View style={styles.detailTextContainer}>
            <Text style={styles.detailText}>Availability</Text>
            <Switch
              onValueChange={toggle}
              value={availability}
              trackColor={{ false: "grey", true: "blue" }}
            />
          </View>
          <View style={styles.detailTextContainer}>
            <Text style={styles.detailText}>Location</Text>
            <Button title="Set Location" onPress={getLocation} />
          </View>
        </Card>
      )}
      {emergency && (
        <Card>
          <Card.Title style={styles.emergencyText}>EMERGENCY</Card.Title>
          <Card.Divider></Card.Divider>
          <Text style={styles.detailText}>An emergency has occurred</Text>
          <Text style={styles.detailText}>
            Please press the button below to get directions
          </Text>
          <View style={styles.directionButtonContainer}>
            <Button
              buttonStyle={styles.directionButton}
              titleStyle={styles.directionButtonText}
              title="DIRECTIONS"
              onPress={openInMaps}
            />
          </View>
          <Button
            buttonStyle={styles.reportButton}
            titleStyle={styles.reportStyle}
            title="Report"
            onPress={() => {
              console.log("report");
              clearEmergency();
              props.navigation.navigate("Report", { type: emergencyType });
            }}
          />
          <Button title="Clear" type="clear" onPress={clearEmergency} />
        </Card>
      )}
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

const styles = StyleSheet.create({
  detailText: {
    fontFamily: "WorkSans_400Regular",
    fontSize: 20,
  },
  detailTextContainer: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  emergencyText: {
    fontFamily: "WorkSans_700Bold",
    fontSize: 40,
    color: "red",
  },
  directionButton: {
    padding: 30,
    backgroundColor: "red",
  },
  directionButtonText: {
    fontFamily: "WorkSans_800ExtraBold",
    fontSize: 30,
  },
  directionButtonContainer: {
    marginVertical: 20,
  },
  reportStyle: {
    fontFamily: "WorkSans_600SemiBold",
    fontSize: 25,
  },
  reportButton: {
    padding: 20,
    backgroundColor: Colours.main,
  },
});

export default Details;
