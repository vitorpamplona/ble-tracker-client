import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setDeviceId, setServer } from "../../actions/device";
import { View, SafeAreaView, Text, KeyboardAvoidingView } from "react-native";
import Input from "../../components/Input";
import Button from "../../components/Button";
import screenNames from "../../constants/screenNames";
import AsyncStorage from "@react-native-community/async-storage";
import { WIDTH } from "../../constants/dimensions";

import Logo from "../../../assets/images/logo.svg";
import Circles from "../../../assets/images/circles.svg";
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

    navigation.navigate(screenNames.PRIVACY_POLICY);
  };

  return (
    <KeyboardAvoidingView style={styles.screen} behavior="padding">
      <SafeAreaView style={{ flex: 1 }}>
        <Logo width={220} height={42} style={styles.logo} />
        <View style={styles.content}>
          <Circles style={styles.circles} width={WIDTH} />
          <Text style={styles.title}>Log in to Contact Tracing</Text>
        </View>
        <View style={styles.footer}>
          <Input
            label="Server URL"
            placeholder="Enter server URL"
            style={{ marginBottom: 20 }}
            onChangeText={(text) => setServerAddress(text)}
          />
          <Input
            label="Employee ID"
            placeholder="Enter employee ID"
            style={{ marginBottom: 20 }}
            onChangeText={(text) => setEmployeeId(text)}
          />
          <Button
            label="Start Contact Tracing"
            onPress={handleSubmit}
            style={styles.button}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

export default EmployeeId;
