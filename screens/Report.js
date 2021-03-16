import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Divider, Input, Overlay, Button } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimePicker from "@react-native-community/datetimepicker";
import Colours from "../constants/colours";
import { useSelector, useDispatch } from "react-redux";
import * as eTeamActions from "../helpers/eTeam-actions";
import { Alert } from "react-native";

const Report = (props) => {
  const token = useSelector((state) => state.eTeam.token);
  const dispatch = useDispatch();
  const emergencyType = props.navigation.getParam("type");
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [time, setTime] = useState(new Date());
  const [shownTime, setShownTime] = useState();
  const [typeOverlayVisible, setTypeOverlayVisible] = useState(false);
  const [type, setType] = useState();
  const [sideOverlayVisible, setSideOverlayVisible] = useState(false);
  const [side, setSide] = useState();
  const [severityOverlayVisible, setSeverityOverlayVisible] = useState(false);
  const [severity, setSeverity] = useState();
  const [suburbOverlayVisible, setSuburbOverlayVisible] = useState(false);
  const [suburb, setSuburb] = useState();
  const [kmPost, setkmPost] = useState();
  const [age, setAge] = useState();
  const [gender, setGender] = useState();
  const [genderOverlayVisible, setGenderOverlayVisible] = useState(false);
  const [weather, setWeather] = useState();
  const [weatherOverlayVisible, setWeatherOverlayVisible] = useState(false);
  const [vehicle, setVehicle] = useState();
  const [vehicleOverlayVisible, setVehicleOverlayVisible] = useState(false);
  const [vehicleManu, setVehicleManu] = useState(new Date());
  const [shownVehicleManu, setShownVehicleManu] = useState();
  const [
    vehicleManuYearPickerVisible,
    setVehicleManuYearPickerVisible,
  ] = useState(false);
  const [license, setLicense] = useState(new Date());
  const [shownLicense, setShownLicense] = useState();
  const [licenseDatePickerVisible, setLicenseDatePickerVisible] = useState(
    false
  );
  const [reason, setReason] = useState();
  const [reasonOverlayVisible, setReasonOverlayVisible] = useState(false);
  const [speed, setSpeed] = useState();

  const accidentSubmit = async (details) => {
    try {
      //await dispatch(eTeamActions.toggle(username));
      await dispatch(eTeamActions.accidentSubmit(details));
      Alert.alert(
        "Report submitted successfully!",
        "The accident report you submitted has been saved",
        [{ text: "Okay" }]
      );
    } catch (err) {
      console.log("Report page accidentSubmit function error");
      console.log(err);
    }
  };

  const eventSubmit = async (details) => {
    try {
      //await dispatch(eTeamActions.toggle(username));
      await dispatch(eTeamActions.eventSubmit(details));
      Alert.alert(
        "Report submitted successfully!",
        "The event report you submitted has been saved",
        [{ text: "Okay" }]
      );
    } catch (err) {
      console.log("Report page eventSubmit function error");
      console.log(err);
    }
  };

  return (
    <KeyboardAwareScrollView>
      {emergencyType === "1" && (
        <View>
          <View style={{ width: "80%", ...styles.headerContainer }}>
            <Text style={styles.headerText}>Accident Reporting</Text>
          </View>
          <View style={styles.contentView}>
            <Text style={styles.fieldText}>Time of Occurence</Text>
            <Divider style={styles.divider} />
            <Input
              value={shownTime}
              placeholder="Time"
              showSoftInputOnFocus={false}
              onFocus={() => {
                setShowTimePicker(true);
              }}
            />
            {showTimePicker && (
              <DateTimePicker
                testID="accidentTimePicker"
                value={time}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={(event, selected) => {
                  setShowTimePicker(false);
                  console.log(event);
                  if (event.type !== "dismissed") {
                    setShownTime(
                      selected.getHours() +
                        ":" +
                        (selected.getMinutes() < 10
                          ? "0" + selected.getMinutes()
                          : selected.getMinutes())
                    );
                  }
                }}
              />
            )}
            <Text style={styles.fieldText}>Driver Age</Text>
            <Divider style={styles.divider} />
            <Input value={age} placeholder="Age" keyboardType="number-pad" />
            <Text style={styles.fieldText}>Driver Gender</Text>
            <Divider style={styles.divider} />
            <Input
              placeholder="Gender"
              showSoftInputOnFocus={false}
              onFocus={() => {
                setGenderOverlayVisible(true);
              }}
              value={gender}
            />
            <Overlay
              isVisible={genderOverlayVisible}
              overlayStyle={styles.sideOverlay}
            >
              <View>
                <Button
                  title="Male"
                  onPress={() => {
                    setGenderOverlayVisible(false);
                    setGender("Male");
                  }}
                  buttonStyle={styles.overlayButton}
                  titleStyle={styles.overlayButtonTitle}
                  containerStyle={styles.overlayButtonContainer}
                />
                <Button
                  title="Female"
                  onPress={() => {
                    setGenderOverlayVisible(false);
                    setGender("Female");
                  }}
                  buttonStyle={styles.overlayButton}
                  titleStyle={styles.overlayButtonTitle}
                  containerStyle={styles.overlayButtonContainer}
                />
              </View>
            </Overlay>
            <Text style={styles.fieldText}>Weather</Text>
            <Divider style={styles.divider} />
            <Input
              placeholder="Weather"
              showSoftInputOnFocus={false}
              onFocus={() => {
                setWeatherOverlayVisible(true);
              }}
              value={weather}
            />
            <Overlay
              isVisible={weatherOverlayVisible}
              overlayStyle={styles.sideOverlay}
            >
              <View>
                <Button
                  title="Clear"
                  onPress={() => {
                    setWeatherOverlayVisible(false);
                    setWeather("Clear");
                  }}
                  buttonStyle={styles.overlayButton}
                  titleStyle={styles.overlayButtonTitle}
                  containerStyle={styles.overlayButtonContainer}
                />
                <Button
                  title="Rainy"
                  onPress={() => {
                    setWeatherOverlayVisible(false);
                    setWeather("Rainy");
                  }}
                  buttonStyle={styles.overlayButton}
                  titleStyle={styles.overlayButtonTitle}
                  containerStyle={styles.overlayButtonContainer}
                />
              </View>
            </Overlay>
            <Text style={styles.fieldText}>Vehicle Type</Text>
            <Divider style={styles.divider} />
            <Input
              placeholder="Type"
              showSoftInputOnFocus={false}
              onFocus={() => {
                setVehicleOverlayVisible(true);
              }}
              value={vehicle}
            />
            <Overlay
              isVisible={vehicleOverlayVisible}
              overlayStyle={styles.severityOverlay}
            >
              <View>
                <Button
                  title="Car"
                  onPress={() => {
                    setVehicleOverlayVisible(false);
                    setVehicle("Car");
                  }}
                  buttonStyle={styles.overlayButton}
                  titleStyle={styles.overlayButtonTitle}
                  containerStyle={styles.overlayButtonContainer}
                />
                <Button
                  title="Dual Purpose"
                  onPress={() => {
                    setVehicleOverlayVisible(false);
                    setVehicle("Dual Purpose");
                  }}
                  buttonStyle={styles.overlayButton}
                  titleStyle={styles.overlayButtonTitle}
                  containerStyle={styles.overlayButtonContainer}
                />
                <Button
                  title="HV"
                  onPress={() => {
                    setVehicleOverlayVisible(false);
                    setVehicle("HV");
                  }}
                  buttonStyle={styles.overlayButton}
                  titleStyle={styles.overlayButtonTitle}
                  containerStyle={styles.overlayButtonContainer}
                />
              </View>
            </Overlay>
            <Text style={styles.fieldText}>Vehicle Year of Manufacture</Text>
            <Divider style={styles.divider} />
            <Input
              value={shownVehicleManu}
              placeholder="YOM"
              showSoftInputOnFocus={false}
              onFocus={() => {
                setVehicleManuYearPickerVisible(true);
              }}
            />
            {vehicleManuYearPickerVisible && (
              <DateTimePicker
                testID="vehicleManuYearPicker"
                value={vehicleManu}
                mode="date"
                is24Hour={true}
                display="spinner"
                maximumDate={new Date()}
                onChange={(event, selected) => {
                  setVehicleManuYearPickerVisible(false);
                  console.log(event);
                  if (event.type !== "dismissed") {
                    setShownVehicleManu("" + selected.getFullYear());
                  }
                }}
              />
            )}
            <Text style={styles.fieldText}>License Issue Date</Text>
            <Divider style={styles.divider} />
            <Input
              value={shownLicense}
              placeholder="License Issue"
              showSoftInputOnFocus={false}
              onFocus={() => {
                setLicenseDatePickerVisible(true);
              }}
            />
            {licenseDatePickerVisible && (
              <DateTimePicker
                testID="licensePicker"
                value={license}
                mode="date"
                is24Hour={true}
                display="spinner"
                maximumDate={new Date()}
                onChange={(event, selected) => {
                  setLicenseDatePickerVisible(false);
                  console.log(event);
                  if (event.type !== "dismissed") {
                    setShownLicense(
                      selected.getDate() +
                        "/" +
                        (selected.getMonth() + 1) +
                        "/" +
                        selected.getFullYear()
                    );
                  }
                }}
              />
            )}
            <Text style={styles.fieldText}>Driving Side</Text>
            <Divider style={styles.divider} />
            <Input
              placeholder="Driving Side"
              showSoftInputOnFocus={false}
              onFocus={() => {
                setSideOverlayVisible(true);
              }}
              value={side}
            />
            <Overlay
              isVisible={sideOverlayVisible}
              overlayStyle={styles.sideOverlay}
            >
              <View>
                <Button
                  title="Colombo to Matara"
                  onPress={() => {
                    setSideOverlayVisible(false);
                    setSide("Colombo to Matara");
                  }}
                  buttonStyle={styles.overlayButton}
                  titleStyle={styles.overlayButtonTitle}
                  containerStyle={styles.overlayButtonContainer}
                />
                <Button
                  title="Matara to Colombo"
                  onPress={() => {
                    setSideOverlayVisible(false);
                    setSide("Matara to Colombo");
                  }}
                  buttonStyle={styles.overlayButton}
                  titleStyle={styles.overlayButtonTitle}
                  containerStyle={styles.overlayButtonContainer}
                />
              </View>
            </Overlay>
            <Text style={styles.fieldText}>Severity of Accident</Text>
            <Divider style={styles.divider} />
            <Input
              placeholder="Severity"
              showSoftInputOnFocus={false}
              onFocus={() => {
                setSeverityOverlayVisible(true);
              }}
              value={severity}
            />
            <Overlay
              isVisible={severityOverlayVisible}
              overlayStyle={styles.severityOverlay}
            >
              <View>
                <Button
                  title="Property Damage"
                  onPress={() => {
                    setSeverityOverlayVisible(false);
                    setSeverity("Property Damage");
                  }}
                  buttonStyle={styles.overlayButton}
                  titleStyle={styles.overlayButtonTitle}
                  containerStyle={styles.overlayButtonContainer}
                />
                <Button
                  title="Injury"
                  onPress={() => {
                    setSeverityOverlayVisible(false);
                    setSeverity("Injury");
                  }}
                  buttonStyle={styles.overlayButton}
                  titleStyle={styles.overlayButtonTitle}
                  containerStyle={styles.overlayButtonContainer}
                />
                <Button
                  title="Fatal"
                  onPress={() => {
                    setSeverityOverlayVisible(false);
                    setSeverity("Fatal");
                  }}
                  buttonStyle={styles.overlayButton}
                  titleStyle={styles.overlayButtonTitle}
                  containerStyle={styles.overlayButtonContainer}
                />
              </View>
            </Overlay>
            <Text style={styles.fieldText}>Reason for Accident</Text>
            <Divider style={styles.divider} />
            <Input
              placeholder="Reason"
              showSoftInputOnFocus={false}
              onFocus={() => {
                setReasonOverlayVisible(true);
              }}
              value={reason}
            />
            <Overlay
              isVisible={reasonOverlayVisible}
              overlayStyle={styles.reasonOverlay}
            >
              <View>
                <Button
                  title="Speeding"
                  onPress={() => {
                    setReasonOverlayVisible(false);
                    setReason("Speeding");
                  }}
                  buttonStyle={styles.overlayButton}
                  titleStyle={styles.overlayButtonTitle}
                  containerStyle={styles.overlayButtonContainer}
                />
                <Button
                  title="Sleep"
                  onPress={() => {
                    setReasonOverlayVisible(false);
                    setReason("Sleep");
                  }}
                  buttonStyle={styles.overlayButton}
                  titleStyle={styles.overlayButtonTitle}
                  containerStyle={styles.overlayButtonContainer}
                />
                <Button
                  title="Slipping"
                  onPress={() => {
                    setReasonOverlayVisible(false);
                    setReason("Slipping");
                  }}
                  buttonStyle={styles.overlayButton}
                  titleStyle={styles.overlayButtonTitle}
                  containerStyle={styles.overlayButtonContainer}
                />
                <Button
                  title="Vehicle Issue"
                  onPress={() => {
                    setReasonOverlayVisible(false);
                    setReason("Vehicle Issue");
                  }}
                  buttonStyle={styles.overlayButton}
                  titleStyle={styles.overlayButtonTitle}
                  containerStyle={styles.overlayButtonContainer}
                />
                <Button
                  title="Tyre Blast"
                  onPress={() => {
                    setReasonOverlayVisible(false);
                    setReason("Tyre Blast");
                  }}
                  buttonStyle={styles.overlayButton}
                  titleStyle={styles.overlayButtonTitle}
                  containerStyle={styles.overlayButtonContainer}
                />
                <Button
                  title="Tyre Patch"
                  onPress={() => {
                    setReasonOverlayVisible(false);
                    setReason("Tyre Patch");
                  }}
                  buttonStyle={styles.overlayButton}
                  titleStyle={styles.overlayButtonTitle}
                  containerStyle={styles.overlayButtonContainer}
                />
                <Button
                  title="Animal Crossing"
                  onPress={() => {
                    setReasonOverlayVisible(false);
                    setReason("Animal Crossing");
                  }}
                  buttonStyle={styles.overlayButton}
                  titleStyle={styles.overlayButtonTitle}
                  containerStyle={styles.overlayButtonContainer}
                />
                <Button
                  title="Other"
                  onPress={() => {
                    setReasonOverlayVisible(false);
                    setReason("Other");
                  }}
                  buttonStyle={styles.overlayButton}
                  titleStyle={styles.overlayButtonTitle}
                  containerStyle={styles.overlayButtonContainer}
                />
              </View>
            </Overlay>
            {reason === "Other" && (
              <Input
                multiline={true}
                numberOfLines={4}
                containerStyle={{ marginTop: 2, marginHorizontal: 2 }}
                inputContainerStyle={{ backgroundColor: "#eaeaea" }}
                inputStyle={{
                  textAlignVertical: "top",
                  fontFamily: "WorkSans_400Regular",
                }}
                placeholder="Provide details"
              />
            )}
            <Text style={styles.fieldText}>Suburb</Text>
            <Divider style={styles.divider} />
            <Input
              placeholder="Suburb"
              showSoftInputOnFocus={false}
              value={suburb}
              onFocus={() => {
                setSuburbOverlayVisible(true);
              }}
            />
            <Overlay
              isVisible={suburbOverlayVisible}
              overlayStyle={styles.suburbOverlay}
            >
              <View>
                <KeyboardAwareScrollView>
                  <Button
                    title="Kottawa"
                    onPress={() => {
                      setSuburbOverlayVisible(false);
                      setSuburb("Kottawa");
                      setkmPost("0");
                    }}
                    buttonStyle={styles.overlayButton}
                    titleStyle={styles.overlayButtonTitle}
                    containerStyle={styles.overlayButtonContainer}
                  />
                  <Button
                    title="Kahathuduwa"
                    onPress={() => {
                      setSuburbOverlayVisible(false);
                      setSuburb("Kahathuduwa");
                      setkmPost("5.9");
                    }}
                    buttonStyle={styles.overlayButton}
                    titleStyle={styles.overlayButtonTitle}
                    containerStyle={styles.overlayButtonContainer}
                  />
                  <Button
                    title="Gelanigama"
                    onPress={() => {
                      setSuburbOverlayVisible(false);
                      setSuburb("Gelanigama");
                      setkmPost("13.7");
                    }}
                    buttonStyle={styles.overlayButton}
                    titleStyle={styles.overlayButtonTitle}
                    containerStyle={styles.overlayButtonContainer}
                  />
                  <Button
                    title="Dodangoda"
                    onPress={() => {
                      setSuburbOverlayVisible(false);
                      setSuburb("Dodangoda");
                      setkmPost("34.8");
                    }}
                    buttonStyle={styles.overlayButton}
                    titleStyle={styles.overlayButtonTitle}
                    containerStyle={styles.overlayButtonContainer}
                  />
                  <Button
                    title="Welipanna"
                    onPress={() => {
                      setSuburbOverlayVisible(false);
                      setSuburb("Welipanna");
                      setkmPost("46");
                    }}
                    buttonStyle={styles.overlayButton}
                    titleStyle={styles.overlayButtonTitle}
                    containerStyle={styles.overlayButtonContainer}
                  />
                  <Button
                    title="Kurundugahahetekma"
                    onPress={() => {
                      setSuburbOverlayVisible(false);
                      setSuburb("Kurundugahahetekma");
                      setkmPost("67.6");
                    }}
                    buttonStyle={styles.overlayButton}
                    titleStyle={styles.overlayButtonTitle}
                    containerStyle={styles.overlayButtonContainer}
                  />
                  <Button
                    title="Baddegama"
                    onPress={() => {
                      setSuburbOverlayVisible(false);
                      setSuburb("Baddegama");
                      setkmPost("79.8");
                    }}
                    buttonStyle={styles.overlayButton}
                    titleStyle={styles.overlayButtonTitle}
                    containerStyle={styles.overlayButtonContainer}
                  />
                  <Button
                    title="Pinnaduwa"
                    onPress={() => {
                      setSuburbOverlayVisible(false);
                      setSuburb("Pinnaduwa");
                      setkmPost("95.3");
                    }}
                    buttonStyle={styles.overlayButton}
                    titleStyle={styles.overlayButtonTitle}
                    containerStyle={styles.overlayButtonContainer}
                  />
                  <Button
                    title="Imaduwa"
                    onPress={() => {
                      setSuburbOverlayVisible(false);
                      setSuburb("Imaduwa");
                      setkmPost("108");
                    }}
                    buttonStyle={styles.overlayButton}
                    titleStyle={styles.overlayButtonTitle}
                    containerStyle={styles.overlayButtonContainer}
                  />
                  <Button
                    title="Kokmaduwa"
                    onPress={() => {
                      setSuburbOverlayVisible(false);
                      setSuburb("Kokmaduwa");
                      setkmPost("116.5");
                    }}
                    buttonStyle={styles.overlayButton}
                    titleStyle={styles.overlayButtonTitle}
                    containerStyle={styles.overlayButtonContainer}
                  />
                  <Button
                    title="Godagama"
                    onPress={() => {
                      setSuburbOverlayVisible(false);
                      setSuburb("Godagama");
                      setkmPost("127");
                    }}
                    buttonStyle={styles.overlayButton}
                    titleStyle={styles.overlayButtonTitle}
                    containerStyle={styles.overlayButtonContainer}
                  />
                </KeyboardAwareScrollView>
              </View>
            </Overlay>
            <Text style={styles.fieldText}>Operated Speed (kmph)</Text>
            <Divider style={styles.divider} />
            <Input
              value={speed}
              placeholder="Speed"
              keyboardType="number-pad"
            />
          </View>
        </View>
      )}
      {emergencyType === "0" && (
        <View>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Event Reporting</Text>
          </View>
          <View style={styles.contentView}>
            <Text style={styles.fieldText}>Time of Occurence</Text>
            <Divider style={styles.divider} />
            <Input
              value={shownTime}
              placeholder="Time"
              showSoftInputOnFocus={false}
              onFocus={() => {
                setShowTimePicker(true);
              }}
            />
            {showTimePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={time}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={(event, selected) => {
                  setShowTimePicker(false);
                  console.log(event);
                  if (event.type !== "dismissed") {
                    setShownTime(
                      selected.getHours() +
                        ":" +
                        (selected.getMinutes() < 10
                          ? "0" + selected.getMinutes()
                          : selected.getMinutes())
                    );
                  }
                }}
              />
            )}
            <Text style={styles.fieldText}>Type of Event</Text>
            <Divider style={styles.divider} />
            <Input
              placeholder="Type"
              showSoftInputOnFocus={false}
              onFocus={() => {
                setTypeOverlayVisible(true);
              }}
              value={type}
            />
            <Overlay
              isVisible={typeOverlayVisible}
              overlayStyle={styles.typeOverlay}
            >
              <View>
                <Button
                  title="Fallen Tree"
                  onPress={() => {
                    setTypeOverlayVisible(false);
                    setType("Fallen Tree");
                  }}
                  buttonStyle={styles.overlayButton}
                  titleStyle={styles.overlayButtonTitle}
                  containerStyle={styles.overlayButtonContainer}
                />
                <Button
                  title="Landslide"
                  onPress={() => {
                    setTypeOverlayVisible(false);
                    setType("Landslide");
                  }}
                  buttonStyle={styles.overlayButton}
                  titleStyle={styles.overlayButtonTitle}
                  containerStyle={styles.overlayButtonContainer}
                />
                <Button
                  title="Flooding"
                  onPress={() => {
                    setTypeOverlayVisible(false);
                    setType("Flooding");
                  }}
                  buttonStyle={styles.overlayButton}
                  titleStyle={styles.overlayButtonTitle}
                  containerStyle={styles.overlayButtonContainer}
                />
                <Button
                  title="Mist"
                  onPress={() => {
                    setTypeOverlayVisible(false);
                    setType("Mist");
                  }}
                  buttonStyle={styles.overlayButton}
                  titleStyle={styles.overlayButtonTitle}
                  containerStyle={styles.overlayButtonContainer}
                />
              </View>
            </Overlay>
            <Text style={styles.fieldText}>Driving Side</Text>
            <Divider style={styles.divider} />
            <Input
              placeholder="Driving Side"
              showSoftInputOnFocus={false}
              onFocus={() => {
                setSideOverlayVisible(true);
              }}
              value={side}
            />
            <Overlay
              isVisible={sideOverlayVisible}
              overlayStyle={styles.sideOverlay}
            >
              <View>
                <Button
                  title="Colombo to Matara"
                  onPress={() => {
                    setSideOverlayVisible(false);
                    setSide("Colombo to Matara");
                  }}
                  buttonStyle={styles.overlayButton}
                  titleStyle={styles.overlayButtonTitle}
                  containerStyle={styles.overlayButtonContainer}
                />
                <Button
                  title="Matara to Colombo"
                  onPress={() => {
                    setSideOverlayVisible(false);
                    setSide("Matara to Colombo");
                  }}
                  buttonStyle={styles.overlayButton}
                  titleStyle={styles.overlayButtonTitle}
                  containerStyle={styles.overlayButtonContainer}
                />
              </View>
            </Overlay>
            <Text style={styles.fieldText}>Severity</Text>
            <Divider style={styles.divider} />
            <Input
              placeholder="Severity"
              showSoftInputOnFocus={false}
              onFocus={() => {
                setSeverityOverlayVisible(true);
              }}
              value={severity}
            />
            <Overlay
              isVisible={severityOverlayVisible}
              overlayStyle={styles.severityOverlay}
            >
              <View>
                <Button
                  title="Minor"
                  onPress={() => {
                    setSeverityOverlayVisible(false);
                    setSeverity("Minor");
                  }}
                  buttonStyle={styles.overlayButton}
                  titleStyle={styles.overlayButtonTitle}
                  containerStyle={styles.overlayButtonContainer}
                />
                <Button
                  title="Intermediate"
                  onPress={() => {
                    setSeverityOverlayVisible(false);
                    setSeverity("Intermediate");
                  }}
                  buttonStyle={styles.overlayButton}
                  titleStyle={styles.overlayButtonTitle}
                  containerStyle={styles.overlayButtonContainer}
                />
                <Button
                  title="Major"
                  onPress={() => {
                    setSeverityOverlayVisible(false);
                    setSeverity("Major");
                  }}
                  buttonStyle={styles.overlayButton}
                  titleStyle={styles.overlayButtonTitle}
                  containerStyle={styles.overlayButtonContainer}
                />
              </View>
            </Overlay>
            <Text style={styles.fieldText}>Suburb</Text>
            <Divider style={styles.divider} />
            <Input
              placeholder="Suburb"
              showSoftInputOnFocus={false}
              value={suburb}
              onFocus={() => {
                setSuburbOverlayVisible(true);
              }}
            />
            <Overlay
              isVisible={suburbOverlayVisible}
              overlayStyle={styles.suburbOverlay}
            >
              <View>
                <KeyboardAwareScrollView>
                  <Button
                    title="Kottawa"
                    onPress={() => {
                      setSuburbOverlayVisible(false);
                      setSuburb("Kottawa");
                      setkmPost("0");
                    }}
                    buttonStyle={styles.overlayButton}
                    titleStyle={styles.overlayButtonTitle}
                    containerStyle={styles.overlayButtonContainer}
                  />
                  <Button
                    title="Kahathuduwa"
                    onPress={() => {
                      setSuburbOverlayVisible(false);
                      setSuburb("Kahathuduwa");
                      setkmPost("5.9");
                    }}
                    buttonStyle={styles.overlayButton}
                    titleStyle={styles.overlayButtonTitle}
                    containerStyle={styles.overlayButtonContainer}
                  />
                  <Button
                    title="Gelanigama"
                    onPress={() => {
                      setSuburbOverlayVisible(false);
                      setSuburb("Gelanigama");
                      setkmPost("13.7");
                    }}
                    buttonStyle={styles.overlayButton}
                    titleStyle={styles.overlayButtonTitle}
                    containerStyle={styles.overlayButtonContainer}
                  />
                  <Button
                    title="Dodangoda"
                    onPress={() => {
                      setSuburbOverlayVisible(false);
                      setSuburb("Dodangoda");
                      setkmPost("34.8");
                    }}
                    buttonStyle={styles.overlayButton}
                    titleStyle={styles.overlayButtonTitle}
                    containerStyle={styles.overlayButtonContainer}
                  />
                  <Button
                    title="Welipanna"
                    onPress={() => {
                      setSuburbOverlayVisible(false);
                      setSuburb("Welipanna");
                      setkmPost("46");
                    }}
                    buttonStyle={styles.overlayButton}
                    titleStyle={styles.overlayButtonTitle}
                    containerStyle={styles.overlayButtonContainer}
                  />
                  <Button
                    title="Kurundugahahetekma"
                    onPress={() => {
                      setSuburbOverlayVisible(false);
                      setSuburb("Kurundugahahetekma");
                      setkmPost("67.6");
                    }}
                    buttonStyle={styles.overlayButton}
                    titleStyle={styles.overlayButtonTitle}
                    containerStyle={styles.overlayButtonContainer}
                  />
                  <Button
                    title="Baddegama"
                    onPress={() => {
                      setSuburbOverlayVisible(false);
                      setSuburb("Baddegama");
                      setkmPost("79.8");
                    }}
                    buttonStyle={styles.overlayButton}
                    titleStyle={styles.overlayButtonTitle}
                    containerStyle={styles.overlayButtonContainer}
                  />
                  <Button
                    title="Pinnaduwa"
                    onPress={() => {
                      setSuburbOverlayVisible(false);
                      setSuburb("Pinnaduwa");
                      setkmPost("95.3");
                    }}
                    buttonStyle={styles.overlayButton}
                    titleStyle={styles.overlayButtonTitle}
                    containerStyle={styles.overlayButtonContainer}
                  />
                  <Button
                    title="Imaduwa"
                    onPress={() => {
                      setSuburbOverlayVisible(false);
                      setSuburb("Imaduwa");
                      setkmPost("108");
                    }}
                    buttonStyle={styles.overlayButton}
                    titleStyle={styles.overlayButtonTitle}
                    containerStyle={styles.overlayButtonContainer}
                  />
                  <Button
                    title="Kokmaduwa"
                    onPress={() => {
                      setSuburbOverlayVisible(false);
                      setSuburb("Kokmaduwa");
                      setkmPost("116.5");
                    }}
                    buttonStyle={styles.overlayButton}
                    titleStyle={styles.overlayButtonTitle}
                    containerStyle={styles.overlayButtonContainer}
                  />
                  <Button
                    title="Godagama"
                    onPress={() => {
                      setSuburbOverlayVisible(false);
                      setSuburb("Godagama");
                      setkmPost("127");
                    }}
                    buttonStyle={styles.overlayButton}
                    titleStyle={styles.overlayButtonTitle}
                    containerStyle={styles.overlayButtonContainer}
                  />
                </KeyboardAwareScrollView>
              </View>
            </Overlay>
          </View>
        </View>
      )}
      <Button
        title="Submit"
        containerStyle={{ marginBottom: 20 }}
        buttonStyle={styles.submitButton}
        titleStyle={styles.submitText}
        onPress={() => {
          if (emergencyType === "1") {
            let details = {
              datetime: time,
              driverAge: age,
              driverGender: gender,
              weather: weather,
              vehicleType: vehicle,
              vehicleYOM: shownVehicleManu,
              licenseIssueDate: license,
              drivingSide: side,
              severity: severity,
              reason: reason,
              suburb: suburb,
              kmPost: kmPost,
              operatedSpeed: speed,
              sessionToken: token,
            };
            accidentSubmit(details);
            props.navigation.pop();
          } else {
            let details = {
              datetime: time,
              type: type,
              drivingSide: side,
              severity: severity,
              kmPost: kmPost,
              suburb: suburb,
              sessionToken: token,
            };
            eventSubmit(details);
            props.navigation.pop();
          }
        }}
      />
    </KeyboardAwareScrollView>
  );
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
  headerText: {
    textAlign: "left",
    marginLeft: 10,
    fontSize: 30,
    fontFamily: "WorkSans_600SemiBold",
  },
  contentView: {
    marginTop: 20,
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
  fieldText: {
    textAlign: "left",
    marginLeft: 10,
    fontSize: 20,
    fontFamily: "WorkSans_700Bold",
  },
  divider: {
    marginTop: 5,
    marginBottom: 10,
  },
  typeOverlay: {
    flex: 0.4,
    width: "85%",
    borderRadius: 10,
    justifyContent: "center",
  },
  sideOverlay: {
    flex: 0.2,
    width: "85%",
    borderRadius: 10,
    justifyContent: "center",
  },
  severityOverlay: {
    flex: 0.3,
    width: "85%",
    borderRadius: 10,
    justifyContent: "center",
  },
  suburbOverlay: {
    flex: 0.8,
    width: "85%",
    borderRadius: 10,
    justifyContent: "center",
  },
  reasonOverlay: {
    flex: 0.75,
    width: "85%",
    borderRadius: 10,
    justifyContent: "center",
  },
  overlayButtonContainer: {
    marginVertical: 8,
    marginHorizontal: 8,
    borderRadius: 20,
  },
  overlayButtonTitle: {
    fontFamily: "WorkSans_600SemiBold",
    fontSize: 17,
  },
  overlayButton: {
    backgroundColor: Colours.main,
  },
});

export default Report;
/*
        Accident Time
        Driver Age
        Driver Gender
        Weather
        Vehicle type
        License issue date
        Driving side
        Severity
        Reason
        Suburb
        Operated speed
        */

/*
        Event time
        Event type
        Side
        Severity
        Suburb
        */
