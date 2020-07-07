import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import screenNames from "../constants/screenNames";
import Config from "react-native-config";
import { useSelector } from "react-redux";

//Screens
import Preloader from "../screens/Preloader";
import EmployeeId from "../screens/EmployeeId";
import Home from "../screens/Home";
import Permissions from "../screens/Permissions";
import PrivacyPolicy from "../screens/PrivacyPolicy";
import Onboarding from "../screens/Onboarding";
import Settings from "../screens/Settings";

const Stack = createStackNavigator();

function AppNavigation() {
  const { loading, permissionsGranted, isOnboarded, isPersonal } = useSelector(
    (store) => store.global
  );
  const { deviceId, server } = useSelector((store) => store.device);

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {loading && (
          <Stack.Screen name={screenNames.PRELOADER} component={Preloader} />
        )}
        {!isOnboarded && (
          <Stack.Screen name={screenNames.ONBOARDING} component={Onboarding} />
        )}
        {!permissionsGranted && (
          <Stack.Screen
            name={screenNames.PERMISSIONS}
            component={Permissions}
          />
        )}
        {isPersonal && !deviceId && !server && (
          <Stack.Screen name={screenNames.EMPLOYEE_ID} component={EmployeeId} />
        )}

        {deviceId && server ? (
          <Stack.Screen name={screenNames.HOME} component={Home} />
        ) : null}
        <Stack.Screen name={screenNames.SETTINGS} component={Settings} />
        <Stack.Screen
          name={screenNames.PRIVACY_POLICY}
          component={PrivacyPolicy}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
