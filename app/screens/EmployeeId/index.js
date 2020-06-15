import React from "react";
import { View } from "react-native";
import Input from "../../components/Input";
import Button from "../../components/Button";

import styles from "./styles";

function EmployeeId({ navigation }) {
  return (
    <View style={styles.screen}>
      <Input placeholder="Employee ID" style={{ marginBottom: 20 }} />
      <Button label="Submit" />
    </View>
  );
}

export default EmployeeId;
