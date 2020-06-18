import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import screenNames from "../constants/screenNames";
import Config from "react-native-config";
import { useDispatch } from "react-redux";
import { setDeviceId } from "../actions/device";
import { requestLocationPermission } from "../services/PermissionRequests";
import DeviceInfo from "react-native-device-info";
import NetInfo from "@react-native-community/netinfo";

//Screens
import EmployeeId from "../screens/EmployeeId";
import Home from "../screens/Home";
import { Platform } from "react-native";

const Stack = createStackNavigator();

function AppNavigation() {
  const dispatch = useDispatch();
  const isPersonal = Config.ENV === "PERSONAL";

  useEffect(() => {
    const requestPermission = async () => {
      await requestLocationPermission();
    };

    const setDeviceIdWithSerialNumber = async () => {
      const serialNumber = await DeviceInfo.getSerialNumber();
      dispatch(setDeviceId(serialNumber));

      //   const deviceId = await DeviceInfo.getUniqueId();
      //   const netInfo = await NetInfo.fetch();

      //   dispatch(setDeviceId(`${deviceId}@${netInfo.details.ipAddress}`));
    };

    requestPermission();
    if (!isPersonal && Platform.OS === "android") {
      setDeviceIdWithSerialNumber();
    }
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {isPersonal && (
          <Stack.Screen name={screenNames.EMPLOYEE_ID} component={EmployeeId} />
        )}
        <Stack.Screen name={screenNames.HOME} component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
