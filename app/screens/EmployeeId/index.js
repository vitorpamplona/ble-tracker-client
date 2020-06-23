import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setDeviceId, setServer } from "../../actions/device";
import { View } from "react-native";
import Input from "../../components/Input";
import Button from "../../components/Button";
import screenNames from "../../constants/screenNames";
import AsyncStorage from "@react-native-community/async-storage";

import styles from "./styles";

function EmployeeId({ navigation }) {
  const dispatch = useDispatch();
  const [employeeId, setEmployeeId] = useState("");
  const [serverAddress, setServerAddress] = useState("");

  const handleSubmit = async () => {
    await AsyncStorage.setItem("server", serverAddress);
    await AsyncStorage.setItem("employee", employeeId);

    dispatch(setDeviceId(employeeId));
    dispatch(setServer(serverAddress));

    navigation.navigate(screenNames.HOME);
  };

  return (
    <View style={styles.screen}>
      <Input
        placeholder="Server address"
        style={{ marginBottom: 20 }}
        onChangeText={(text) => setServerAddress(text)}
      />
      <Input
        placeholder="Employee ID"
        style={{ marginBottom: 20 }}
        onChangeText={(text) => setEmployeeId(text)}
      />
      <Button label="Submit" onPress={handleSubmit} />
    </View>
  );
}

export default EmployeeId;
