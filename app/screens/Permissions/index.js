import React, { useState, useEffect } from "react";

import Button from "../../components/Button";
import PermissionItem from "../../components/PermissionItem";
import AsyncStorage from "@react-native-community/async-storage";

import { View, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Platform } from "react-native";
import { useDispatch } from "react-redux";
import { setDeviceId } from "../../actions/device";
import {
  requestAllPermissions,
  requestLocationPermission,
  requestPhonePermission,
} from "../../services/PermissionRequests";
import DeviceInfo from "react-native-device-info";
import Config from "react-native-config";
import NetInfo from "@react-native-community/netinfo";

import styles from "./styles";
import colors from "../../constants/colors";
import screenNames from "../../constants/screenNames";

function Permissions({ navigation }) {
  const isPersonal = Config.ENV === "PERSONAL";
  const dispatch = useDispatch();
  const [locationPermisionsGranted, setLocationPermissionsGranted] = useState(
    false
  );
  const [phonePermisionsGranted, setPhonePermissionsGranted] = useState(false);

  useEffect(() => {
    const requestPermission = async () => {
      const permissions = await requestAllPermissions();

      if (
        permissions.location === "granted" &&
        permissions.phoneState === "granted"
      )
        return navigation.navigate(screenNames.PRIVACY_POLICY);

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

    navigation.navigate(screenNames.PRIVACY_POLICY);
  };

  const notGranted = !locationPermisionsGranted || !phonePermisionsGranted;

  return (
    <View style={styles.screen}>
      <Ionicons name="md-lock" color={colors.white} size={100} />
      <Text style={styles.title}>Grant Permissions</Text>
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
    </View>
  );
}

export default Permissions;
