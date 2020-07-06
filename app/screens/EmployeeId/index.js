import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setEmployeeData } from "../../actions/device";
import {
  View,
  SafeAreaView,
  Text,
  KeyboardAvoidingView,
  StatusBar,
} from "react-native";
import Input from "../../components/Input";
import Button from "../../components/Button";
import AsyncStorage from "@react-native-community/async-storage";
import { WIDTH } from "../../constants/dimensions";
import NetInfo from "@react-native-community/netinfo";

import Logo from "../../../assets/images/logo.svg";
import Circles from "../../../assets/images/circles.svg";
import styles from "./styles";
import colors from "../../constants/colors";
import screenNames from "../../constants/screenNames";

function EmployeeId({ navigation }) {
  const dispatch = useDispatch();
  const [employeeId, setEmployeeId] = useState("");
  const [serverAddress, setServerAddress] = useState("");

  const handleSubmit = async () => {
    const netInfo = await NetInfo.fetch();

    await AsyncStorage.setItem("server", serverAddress);
    await AsyncStorage.setItem("employeeId", employeeId);

    if (netInfo.details.ipAddress)
      await AsyncStorage.setItem("ipAddress", netInfo.details.ipAddress);

    dispatch(
      setEmployeeData({
        employeeId,
        ipAddress: netInfo.details.ipAddress,
        serverAddress,
      })
    );

    navigation.navigate(screenNames.PRIVACY_POLICY);
  };

  return (
    <KeyboardAvoidingView style={styles.screen} behavior="padding">
      <StatusBar barStyle="light-content" backgroundColor={colors.blue} />
      <SafeAreaView style={{ flex: 1 }}>
        <Logo width={220} height={42} style={styles.logo} />
        <View style={styles.content}>
          <Circles style={styles.circles} width={WIDTH} />
          <Text style={styles.title}>Log in to Contact Tracing</Text>
        </View>
        <View style={styles.footer}>
          <Input
            label="Server URL"
            placeholder="Enter server URL and port"
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
