import React, { useEffect } from "react";
import { View, Text, SafeAreaView } from "react-native";
import styles from "./styles";
import AsyncStorage from "@react-native-community/async-storage";
import Config from "react-native-config";
import { hasAllPermissions } from "../../services/PermissionRequests";
import { setDeviceId, setServer, setEmployeeData } from "../../actions/device";
import {
  acceptPrivacyPolicy,
  setPermissions,
  setLoading,
  setUserOnboarded,
} from "../../actions/global";
import { useDispatch } from "react-redux";
import { WIDTH } from "../../constants/dimensions";
import NetInfo from "@react-native-community/netinfo";

import Logo from "../../../assets/images/logo.svg";
import Circles from "../../../assets/images/circles.svg";

function Preloader() {
  const isPersonal = Config.ENV === "PERSONAL";
  const dispatch = useDispatch();

  const checkIfAccepted = async () => {
    const isAccepted = await AsyncStorage.getItem("policyAccepted");

    if (isAccepted === "true") dispatch(acceptPrivacyPolicy());
  };

  const checkIfOnboarded = async () => {
    const isOnboarded = await AsyncStorage.getItem("onboarded");

    if (isOnboarded === "true") dispatch(setUserOnboarded());
  };

  const checkPermissions = async () => {
    if (await hasAllPermissions()) dispatch(setPermissions());
  };

  const getEmoloyeeValues = async () => {
    if (isPersonal) {
      const netInfo = await NetInfo.fetch();
      const employee = await AsyncStorage.getItem("employeeId");
      const server = await AsyncStorage.getItem("server");

      if (netInfo.details.ipAddress)
        await AsyncStorage.setItem("ipAddress", netInfo.details.ipAddress);

      dispatch(
        setEmployeeData({
          employeeId: employee,
          ipAddress: netInfo.details.ipAddress,
          serverAddress: server,
        })
      );
    }
  };

  const checkAll = async () => {
    await checkIfAccepted();
    await checkPermissions();
    await getEmoloyeeValues();
    await checkIfOnboarded();

    dispatch(setLoading(false));
  };

  useEffect(() => {
    checkAll();
  }, []);

  return (
    <View style={styles.screen}>
      <SafeAreaView style={{ flex: 1 }}>
        <Logo width={220} height={42} style={styles.logo} />
        <View style={{ flex: 1 }}>
          <Circles style={styles.circles} width={WIDTH} />
          <Text style={styles.text}>Loading...</Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default Preloader;
