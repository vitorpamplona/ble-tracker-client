import React, { useEffect } from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import AsyncStorage from "@react-native-community/async-storage";
import { hasAllPermissions } from "../../services/PermissionRequests";
import {
  acceptPrivacyPolicy,
  setPermissions,
  setLoading,
} from "../../actions/global";
import { useDispatch } from "react-redux";

function Preloader() {
  const dispatch = useDispatch();
  const checkIfAccepted = async () => {
    const isAccepted = await AsyncStorage.getItem("policyAccepted");

    if (isAccepted === "true") dispatch(acceptPrivacyPolicy());
  };

  const checkPermissions = async () => {
    if (await hasAllPermissions()) dispatch(setPermissions());
  };

  const checkAll = async () => {
    await checkIfAccepted();
    await checkPermissions();
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
