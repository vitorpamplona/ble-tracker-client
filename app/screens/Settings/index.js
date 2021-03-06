import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";
import Button from "../../components/Button";
import { resetEmployeeValues } from "../../actions/device";
import { useDispatch } from "react-redux";

import styles from "./styles";
import colors from "../../constants/colors";
import screenNames from "../../constants/screenNames";

function Settings({ navigation }) {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await AsyncStorage.removeItem("server");
    await AsyncStorage.removeItem("employee");
    dispatch(resetEmployeeValues());
    navigation.navigate(screenNames.EMPLOYEE_ID);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="md-arrow-back" color={colors.dark} size={38} />
      </TouchableOpacity>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Settings</Text>
        <Button label="Logout" onPress={handleLogout} />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(screenNames.PRIVACY_POLICY, { readOnly: true })
          }
        >
          <Text style={styles.linkText}>Terms and conditions</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default Settings;
