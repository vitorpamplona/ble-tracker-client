import BLEAdvertiser from "react-native-ble-advertiser";
import { PermissionsAndroid } from "react-native";

export async function hasLocationPermission() {
  if (Platform.OS === "ios") {
    return true;
  }
  try {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
    console.log("Location Permission:", granted);
    return granted;
  } catch (e) {
    return e.toString();
  }
}

export async function hasPhonePermission() {
  if (Platform.OS === "ios") {
    return true;
  }
  try {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE
    );
    console.log("Phone Permission:", granted);
    return granted;
  } catch (e) {
    return e.toString();
  }
}

export async function hasAllPermissions() {
  return (await hasLocationPermission()) && (await hasPhonePermission());
}

export async function isBluetoothActive() {
  return (await BLEAdvertiser.getAdapterState()) === "STATE_ON";
}

export async function requestLocationPermission() {
  return await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  );
}

export async function requestPhonePermission() {
  return await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE
  );
}

async function checkBluetoothStatus() {
  try {
    const status = await BLEAdvertiser.getAdapterState();

    console.log("[Bluetooth]", "isBTActive", status);

    if (status !== "STATE_ON") {
      Alert.alert(
        "BCH Contact Tracing requires bluetooth to be enabled",
        "Would you like to enable Bluetooth?",
        [
          {
            text: "Yes",
            onPress: () => BLEAdvertiser.enableAdapter(),
          },
          {
            text: "No",
            onPress: () => console.log("No Pressed"),
            style: "cancel",
          },
        ]
      );
    }
  } catch (error) {
    console.log("[Bluetooth]", "BT Not Enabled");
    return false;
  }
}

export async function requestAllPermissions() {
  try {
    if (Platform.OS === "ios") {
      return {
        location: "granted",
        phoneState: "granted",
      };
    }

    let permissionsGranted;

    if (Platform.OS === "android") {
      permissionsGranted = await PermissionsAndroid.requestMultiple(
        [
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
        ],
        {
          title: "BCH Contact Tracing",
          message: "Example App access to your location and phone ID",
        }
      );
    }

    await checkBluetoothStatus();

    return {
      location:
        permissionsGranted[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION],
      phoneState:
        permissionsGranted[PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE],
    };
  } catch (err) {
    console.warn(err);
  }
}
