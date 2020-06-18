import { StyleSheet } from "react-native";
import colors from "../../constants/colors";

const styles = StyleSheet.create({
  contactWrapper: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  id: {
    fontWeight: "bold",
    fontSize: 18,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default styles;
