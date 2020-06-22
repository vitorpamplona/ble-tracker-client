import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Button from "../../components/Button";
import Checkbox from "../../components/Checkbox";
import Config from "react-native-config";
import styles from "./styles";
import AsyncStorage from "@react-native-community/async-storage";
import screenNames from "../../constants/screenNames";

function PrivacyPolicy({ navigation }) {
  const isPersonal = Config.ENV === "PERSONAL";
  const [accepted, setAccepted] = useState(false);

  const handleContinue = () => {
    AsyncStorage.setItem("policyAccepted", "true");
    navigation.navigate(
      isPersonal ? screenNames.EMPLOYEE_ID : screenNames.HOME
    );
  };

  return (
    <View style={styles.screen}>
      <View style={styles.pdf}>
        <Text style={styles.license}>Licence will be here</Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.acceptTouchable}
          onPress={() => setAccepted(true)}
        >
          <Checkbox checked={accepted} />
          <Text style={styles.acceptText}>
            I accept the licensing agreement
          </Text>
        </TouchableOpacity>
        <Text style={styles.helperText}>
          *You must access in order to use BCH tracker
        </Text>
        <Button
          label="Continue"
          onPress={handleContinue}
          disabled={!accepted}
        />
      </View>
    </View>
  );
}

export default PrivacyPolicy;
