import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setDeviceId } from "../../actions/device";
import { View } from "react-native";
import Input from "../../components/Input";
import Button from "../../components/Button";
import screenNames from "../../constants/screenNames";

import styles from "./styles";

function EmployeeId({ navigation }) {
  const dispatch = useDispatch();
  const [employeeId, setEmployeeId] = useState("");

  const handleSubmit = () => {
    dispatch(setDeviceId(employeeId));
    navigation.navigate(screenNames.HOME);
  };

  return (
    <View style={styles.screen}>
      <Input
        placeholder="Employee ID"
        style={{ marginBottom: 20 }}
        onChangeText={(text) => setEmployeeId(text)}
      />
      <Button label="Submit" onPress={handleSubmit} />
    </View>
  );
}

export default EmployeeId;
