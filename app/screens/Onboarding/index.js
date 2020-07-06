import React from "react";
import { View, SafeAreaView, Text, StatusBar } from "react-native";
import { WIDTH } from "../../constants/dimensions";
import Button from "../../components/Button";
import AsyncStorage from "@react-native-community/async-storage";

import { setUserOnboarded } from "../../actions/global";

import Logo from "../../../assets/images/logo.svg";
import Circles from "../../../assets/images/circles.svg";
import styles from "./styles";
import colors from "../../constants/colors";
import { useDispatch } from "react-redux";

function Onboarding() {
  const dispatch = useDispatch();

  const handleContinue = async () => {
    await AsyncStorage.setItem("onboarded", "true");
    dispatch(setUserOnboarded());
  };

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={colors.blue} />
      <SafeAreaView style={{ flex: 1 }}>
        <Logo width={220} height={42} style={styles.logo} />
        <View style={styles.content}>
          <Circles style={styles.circles} width={WIDTH} />
          <Text style={styles.copy}>
            Contact Tracing can save the places you visit and store them on your
            phone.
          </Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.subtitle}>
            Your phone can help you remember where you’ve been.
          </Text>
          <Button
            label="Start contact tracing"
            style={styles.button}
            onPress={handleContinue}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

export default Onboarding;
