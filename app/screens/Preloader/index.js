import React, { useEffect } from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import AsyncStorage from "@react-native-community/async-storage";
import Config from "react-native-config";
import { hasAllPermissions } from "../../services/PermissionRequests";
import { setDeviceId, setServer } from "../../actions/device";
import {
  acceptPrivacyPolicy,
  setPermissions,
  setLoading,
} from "../../actions/global";
import { useDispatch } from "react-redux";

function Preloader() {
  const isPersonal = Config.ENV === "PERSONAL";
  const dispatch = useDispatch();
  const checkIfAccepted = async () => {
    const isAccepted = await AsyncStorage.getItem("policyAccepted");

    if (isAccepted === "true") dispatch(acceptPrivacyPolicy());
  };

  const checkPermissions = async () => {
    if (await hasAllPermissions()) dispatch(setPermissions());
  };

  const getEmoloyeeValues = async () => {
    if (isPersonal) {
      const employee = await AsyncStorage.getItem("employee");
      const server = await AsyncStorage.getItem("server");

      dispatch(setDeviceId(employee));
      dispatch(setServer(server));
    }
  };

  const checkAll = async () => {
    await checkIfAccepted();
    await checkPermissions();
    await getEmoloyeeValues();
    dispatch(setLoading(false));
  };

  useEffect(() => {
    checkAll();
  }, []);

  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
}

export default Preloader;
