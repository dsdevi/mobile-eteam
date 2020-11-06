import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const Details = (props) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Signed in!</Text>
    </View>
  );
};

Details.navigationOptions = (navData) => {
  return {
    headerTitle: "User Details",
    headerRight: () => (
      <Button
        title="Go Back"
        onPress={() => navData.navigation.navigate("LogInNav")}
      />
    ),
  };
};

export default Details;
