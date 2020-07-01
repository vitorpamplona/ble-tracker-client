import { StyleSheet } from "react-native";
import colors from "../../constants/colors";

const styles = StyleSheet.create({
  contactWrapper: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: colors.lightGrey,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 50,
    alignItems: "center",
    marginBottom: 15,
  },
  nameWrapper: {
    backgroundColor: colors.yellow,
    height: 28,
    padding: 8,
    borderRadius: 5,
  },
  name: {
    color: colors.dark,
    fontSize: 12,
    lineHeight: 12,
    fontWeight: "bold",
  },
  time: {
    color: colors.dark,
    fontSize: 12,
    fontWeight: "bold",
  },
  timeRelative: {
    fontWeight: "400",
  },
});

export default styles;
