# Bluetooth LE Contact Tracing Uploader.

<img align="right" src="./docs/preview.png" data-canonical-src="./docs/preview.png" width="350px"/>

Ultra simple app to track BLE devices on Android using the Phone's Serial Number as UUID (not private).

Together with the server, this app allows companies to track their phones when they are near each other.

## Behavior

1. Locally tracks bluetooth by exposing the Phone's Serial Number (non private)
2. Cache a minute-by-minute database of: `Contact | Time | RSSI`
3. Wake the app at every 15 minutes to scan and broadcast BLE
4. Upload all data to a https://github.com/vitorpamplona/ble-tracker-server (not private).

# Development Overview

This is a React Native app version 61.5

## Requirements

- Git
- NVM
- Node (10.1 or newer)
- Yarn
- Watchman
- OpenJDK (for Android building and installing)
- Android Studio (SDK, AVD)
- CocoaPods (Required for installing iOS dependencies)
- XCode (for iOS Dev)
- ios-deploy (installing your app on a physical device with the CLI)

## Running

Install modules:
`yarn install`

To run, do:

**For MDM**

```
yarn run:mdm
```

**For Android**

```
yarn run:android
```

or

```
npx react-native run-ios --simulator="iPhone 8 Plus"
```

For development, the Metro IP must be the same as the Ruby ble-tracer-server server. ABD uses a reverse port scheme (default IP is "localhost") to access the Metro server. iOS uses the real IP. In order to debug iOS and Android at the same time, the Ruby server must be started with the real IP of the computer, which will be acessible by iOS devices right away. Shake the Android device and hit settings to insert the IP address of your Metro server (same as the ble-tracer-server) to make the Android devices work. 

NOTE: In some cases, the abovementioned procedure leads to the error `Failed to load bundle - Could not connect to development server`. In these cases, kill all other react-native processes and try it again.
