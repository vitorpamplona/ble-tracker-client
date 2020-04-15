import BLEAdvertiser from 'react-native-ble-advertiser'
import { PermissionsAndroid } from 'react-native';

export async function requestLocationPermission() {
  try {
    if (Platform.OS === 'android') {
      const locationGranted = await PermissionsAndroid.requestMultiple(
        [PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE],
        {
          'title': 'BLE Tracker App',
          'message': 'Example App access to your location and phone ID'
        }
      );
      console.log("PErmissions Granted? ", locationGranted === PermissionsAndroid.RESULTS.GRANTED);
    }

    BLEAdvertiser.getAdapterState().then(result => {
      console.log('[Bluetooth]', "isBTActive", result)

      if (result !== "STATE_ON") {
        Alert.alert(
          'BLE Tracker requires bluetooth to be enabled',
          'Would you like to enable Bluetooth?',
          [
            {
              text: 'Yes',
              onPress: () => BLEAdvertiser.enableAdapter(),
            },
            {
              text: 'No',
              onPress: () => console.log('No Pressed'),
              style: 'cancel',
            },
          ],
        )
      }
    }).catch(error => { 
      console.log('[Bluetooth]', "BT Not Enabled")
      return false;
    });
  } catch (err) {
    console.warn(err)
  }
}