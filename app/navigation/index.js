import React, { useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import screenNames from "../constants/screenNames";
import Config from "react-native-config";

//Screens
import EmployeeId from "../screens/EmployeeId";
import Home from "../screens/Home";
import Permissions from "../screens/Permissions";

const Stack = createStackNavigator();

function AppNavigation() {
  const isPersonal = Config.ENV === "PERSONAL";

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name={screenNames.PERMISSIONS} component={Permissions} />
        {isPersonal && (
          <Stack.Screen name={screenNames.EMPLOYEE_ID} component={EmployeeId} />
        )}
        <Stack.Screen name={screenNames.HOME} component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
