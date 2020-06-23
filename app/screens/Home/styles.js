import { StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.white,
    height: "100%",
    position: "relative",
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
  sectionContainerFlex: {
    flex: 1,
    marginTop: 12,
    marginBottom: 12,
    paddingHorizontal: 24,
  },
  sectionContainer: {
    flex: 0,
    marginTop: 12,
    marginBottom: 12,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    marginBottom: 8,
    fontWeight: "600",
    color: Colors.black,
    textAlign: "center",
  },
  sectionDescription: {
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
    color: Colors.dark,
  },
  highlight: {
    fontWeight: "700",
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: "600",
    padding: 4,
    paddingRight: 12,
    textAlign: "right",
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
