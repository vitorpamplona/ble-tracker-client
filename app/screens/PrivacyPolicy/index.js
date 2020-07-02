import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import Button from "../../components/Button";
import Checkbox from "../../components/Checkbox";
import styles from "./styles";
import AsyncStorage from "@react-native-community/async-storage";
import screenNames from "../../constants/screenNames";
import { useSelector } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../../constants/colors";

function PrivacyPolicy({ navigation, route }) {
  const { readOnly } = route.params || {};
  const [accepted, setAccepted] = useState(false);
  const [terms, setTerms] = useState(false);
  const serverAddress = useSelector((state) => state.device.server);

  const handleContinue = () => {
    AsyncStorage.setItem("policyAccepted", "true");
    navigation.navigate(screenNames.HOME);
  };

  const fetchPolicy = async () => {
    try {
      const res = await fetch(`http://${serverAddress}/terms`);
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
      <SafeAreaView style={{ flex: 1 }}>
        {readOnly && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons
              name="md-arrow-round-back"
              color={colors.white}
              size={38}
            />
          </TouchableOpacity>
        )}
        <View style={styles.pdf}>
          <Text style={styles.license}>{terms}</Text>
        </View>
        {!readOnly && (
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
        )}
      </SafeAreaView>
    </View>
  );
}

export default PrivacyPolicy;
