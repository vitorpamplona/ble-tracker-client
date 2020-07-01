import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Button from "../../components/Button";
import Checkbox from "../../components/Checkbox";
import Config from "react-native-config";
import styles from "./styles";
import AsyncStorage from "@react-native-community/async-storage";
import screenNames from "../../constants/screenNames";
import { useSelector } from "react-redux";

function PrivacyPolicy({ navigation }) {
  const isPersonal = Config.ENV === "PERSONAL";
  const [accepted, setAccepted] = useState(false);
  const [terms, setTerms] = useState(false);
  const serverAddress = useSelector((state) => state.device.server);

  const handleContinue = () => {
    AsyncStorage.setItem("policyAccepted", "true");
    navigation.navigate(screenNames.HOME);
  };

  const fetchPolicy = async () => {
    try {
      const res = await fetch(`http://${serverAddress}:4567/terms`);
      const terms = await res.text();

      setTerms(terms);
    } catch (error) {
      console.log("Unable to fetch privacy policy", error);
    }
  };

  useEffect(() => {
    fetchPolicy();
  }, []);

  return (
    <View style={styles.screen}>
      <View style={styles.pdf}>
        <Text style={styles.license}>{terms}</Text>
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
