/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import "react-native-gesture-handler";
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./app/reducers";
import PushNotification from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";

import AppNavigation from "./app/navigation";

export const store = createStore(reducers);

PushNotification.configure({
  onRegister: function (token) {
    console.log("TOKEN:", token);
  },

  onNotification: function (notification) {
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  popInitialNotification: true,
  requestPermissions: true,
});

const App = () => (
  <Provider store={store}>
    <AppNavigation />
  </Provider>
);

export default App;
