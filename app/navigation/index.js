import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import screenNames from "../constants/screenNames";

//Screens
import EmployeeId from "../screens/EmployeeId";
import Home from "../screens/Home";

const Stack = createStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name={screenNames.EMPLOYEE_ID} component={EmployeeId} />
        <Stack.Screen name={screenNames.HOME} component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
