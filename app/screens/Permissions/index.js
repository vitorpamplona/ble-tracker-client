import React, { useState, useEffect } from "react";

import Button from "../../components/Button";
import PermissionItem from "../../components/PermissionItem";
import AsyncStorage from "@react-native-community/async-storage";

import { View, Text, SafeAreaView, StatusBar } from "react-native";
import { Platform } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setDeviceId } from "../../actions/device";
import { setPermissions } from "../../actions/global";
import {
  requestAllPermissions,
  requestLocationPermission,
  requestPhonePermission,
} from "../../services/PermissionRequests";
import DeviceInfo from "react-native-device-info";

import styles from "./styles";
import screenNames from "../../constants/screenNames";
import Logo from "../../../assets/images/logo.svg";
import colors from "../../constants/colors";

function Permissions() {
  const dispatch = useDispatch();
  const isPersonal = useSelector((state) => state.global.isPersonal);
  const [locationPermisionsGranted, setLocationPermissionsGranted] = useState(
    false
  );
  const [phonePermisionsGranted, setPhonePermissionsGranted] = useState(false);

  useEffect(() => {
    const requestPermission = async () => {
      const permissions = await requestAllPermissions();

      setLocationPermissionsGranted(permissions.location === "granted");
      setPhonePermissionsGranted(permissions.phoneState === "granted");
    };

    requestPermission();
  }, []);

  const handleSetLocationPermission = async () => {
    const permission = await requestLocationPermission();
    setLocationPermissionsGranted(permission === "granted");
  };

  const handleSetPhonePermission = async () => {
    const permission = await requestPhonePermission();
    setPhonePermissionsGranted(permission === "granted");
  };

  const setDeviceIdWithSerialNumber = async () => {
    const serialNumber = await DeviceInfo.getSerialNumber();
    dispatch(setDeviceId(serialNumber));

    //   const deviceId = await DeviceInfo.getUniqueId();
    //   const netInfo = await NetInfo.fetch();

    //   dispatch(setDeviceId(`${deviceId}@${netInfo.details.ipAddress}`));
  };

  const handleContinue = () => {
    if (!isPersonal && Platform.OS === "android") {
      setDeviceIdWithSerialNumber();
    }

    dispatch(setPermissions());
  };

  const notGranted = !locationPermisionsGranted || !phonePermisionsGranted;

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={colors.blue} />
      <SafeAreaView style={{ flex: 1 }}>
        <Logo width={220} height={42} style={styles.logo} />

        <View style={styles.content}>
          <Text style={styles.copy}>
            To remember where you go, your phone needs to save your location
          </Text>

          <Text style={styles.subtitle}>
            Below select persmissions you want to enable
          </Text>

          <PermissionItem
            label="Location permission"
            granted={locationPermisionsGranted}
            onPress={handleSetLocationPermission}
          />
          <PermissionItem
            label="Phone state permission"
            granted={phonePermisionsGranted}
            onPress={handleSetPhonePermission}
          />
        </View>
        <View style={styles.footer}>
          <Button
            label="Continue"
            disabled={notGranted}
            onPress={handleContinue}
          />
          {notGranted && (
            <Text style={styles.helperText}>
              Permissions are required to continue
            </Text>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}

export default Permissions;
