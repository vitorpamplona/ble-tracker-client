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

const Stack = createStackNavigator();

function AppNavigation() {
  const isPersonal = Config.ENV === "PERSONAL";
  const { loading, policyAccepted, permissionsGranted } = useSelector(
    (store) => store.global
  );

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {loading && (
          <Stack.Screen name={screenNames.PRELOADER} component={Preloader} />
        )}
        {!permissionsGranted && (
          <Stack.Screen
            name={screenNames.PERMISSIONS}
            component={Permissions}
          />
        )}
        {!policyAccepted && (
          <Stack.Screen
            name={screenNames.PRIVACY_POLICY}
            component={PrivacyPolicy}
          />
        )}
        {isPersonal && (
          <Stack.Screen name={screenNames.EMPLOYEE_ID} component={EmployeeId} />
        )}
        <Stack.Screen name={screenNames.HOME} component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
