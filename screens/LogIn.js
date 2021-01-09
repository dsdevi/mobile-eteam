import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import { Input, Button } from "react-native-elements";
import { useDispatch } from "react-redux";
import Colours from "../constants/colours";

import * as eTeamActions from "../helpers/eTeam-actions";

const LogIn = (props) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (username && password) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [username, password]);

  // useEffect(() => {
  //   if (error) {
  //     Alert.alert("An Error Occured!", error, [{ text: "Okay" }]);
  //   }
  // }, [error]);

  const login = async () => {
    try {
      await dispatch(eTeamActions.login(username, password));
      props.navigation.navigate("UserNav");
    } catch (err) {
      Alert.alert("Sorry", "Invalid email or password", [{ text: "Okay" }]);
    }
  };

  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Log In</Text>
      </View>
      <View style={styles.formView}>
        <Input
          placeholder="Enter username"
          leftIcon={{ type: "ionicon", name: "md-person" }}
          onChangeText={(text) => {
            setUsername(text);
          }}
        />
        <Input
          placeholder="Enter password"
          leftIcon={{ type: "ionicon", name: "md-key" }}
          onChangeText={(text) => {
            setPassword(text);
          }}
          secureTextEntry
        />

        <Button
          title="Log In"
          disabled={submitDisabled}
          buttonStyle={styles.submitButton}
          titleStyle={styles.submitText}
          onPress={login}
        />
      </View>
    </View>
  );
};

LogIn.navigationOptions = (navData) => {
  return {
    headerTitle: "Log In",
  };
};

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 15,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomWidth: 6,
    borderColor: Colours.main,
    marginRight: "40%",
  },
  formView: {
    marginTop: 20,
  },
  text: {
    fontFamily: "WorkSans_500Medium",
    fontSize: 30,
    textAlign: "center",
  },
  headerText: {
    textAlign: "left",
    marginLeft: 10,
    fontSize: 30,
    fontFamily: "WorkSans_600SemiBold",
  },
  submitButton: {
    backgroundColor: Colours.main,
    paddingVertical: 10,
    marginHorizontal: "10%",
    borderRadius: 30,
  },
  submitText: {
    fontSize: 20,
    fontFamily: "WorkSans_600SemiBold",
  },
});

export default LogIn;
