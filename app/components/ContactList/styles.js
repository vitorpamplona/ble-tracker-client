import { StyleSheet } from "react-native";
import colors from "../../constants/colors";

const styles = StyleSheet.create({
  noDevicesWrapper: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: colors.lightGrey,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 50,
    alignItems: "center",
  },
  noDevicesText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#414042",
    textAlign: "center",
  },
});

export default styles;
