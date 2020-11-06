import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput, Button, Alert } from "react-native";
import { useDispatch } from "react-redux";

import * as eTeamActions from "../helpers/eTeam-actions";

const LogIn = (props) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occured!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const login = async () => {
    try {
      await dispatch(eTeamActions.login(username, password));
      props.navigation.navigate('UserNav');
    } catch (err) {
        setError(err.message);
    }
  };

  return (
    <View style={styles.formContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter username"
          onChangeText={(text) => {
            setUsername(text);
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          onChangeText={(text) => {
            setPassword(text);
          }}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Log In" mode="outlined" onPress={login} />
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
  input: {},
  inputContainer: {
    marginTop: 20,
    marginRight: 80,
    marginLeft: 20,
    borderRadius: 20,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  buttonContainer: {
    marginTop: 10,
    alignItems: "flex-start",
    marginLeft: 25,
    borderRadius: 10,
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
  },
});

export default LogIn;
