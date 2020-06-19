import { StyleSheet } from "react-native";
import colors from "../../constants/colors";

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.blue,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: colors.white,
    fontWeight: "bold",
    marginBottom: 40,
  },
  footer: {
    width: "100%",
  },
  helperText: {
    color: "#ccc",
    fontSize: 13,
    textAlign: "center",
    marginTop: 5,
  },
});

export default styles;
