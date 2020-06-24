import { StyleSheet } from "react-native";
import colors from "../../constants/colors";

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.blue,
    position: "relative",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    position: "absolute",
    top: 60,
    left: 20,
  },
  logout: {
    position: "absolute",
    right: 20,
    top: 20,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 99,
  },
  logoutButton: {
    flex: 1,
  },
  bottomSheet: {
    backgroundColor: colors.white,
    height: "100%",
  },
  bottomSheetHeader: {
    width: "100%",
    height: 50,
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
  },
  bottomSheetHandle: {
    backgroundColor: colors.lightGrey,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
    width: 100,
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.dark,
    textAlign: "center",
  },
  counter: {
    marginLeft: 5,
    color: colors.lightGrey,
  },
  sectionContainerFlex: {
    flex: 1,
    marginTop: 12,
    marginBottom: 12,
    paddingHorizontal: 24,
  },
  sectionContainer: {
    marginTop: 12,
    marginBottom: 12,
    paddingHorizontal: 24,
  },
  sectionDescription: {
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
    color: colors.white,
  },
  startLoggingButtonTouchable: {
    borderRadius: 12,
    backgroundColor: "#665eff",
    height: 52,
    alignSelf: "center",
    width: 300,
    justifyContent: "center",
  },
  startLoggingButtonText: {
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: "center",
    color: "#ffffff",
  },
  stopLoggingButtonTouchable: {
    borderRadius: 12,
    backgroundColor: "#fd4a4a",
    height: 52,
    alignSelf: "center",
    width: 300,
    justifyContent: "center",
  },
  stopLoggingButtonText: {
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: "center",
    color: "#ffffff",
  },
  itemPastConnections: {
    paddingTop: 3,
    paddingBottom: 3,
    fontSize: 18,
    fontWeight: "400",
  },
});

export default styles;
