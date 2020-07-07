/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./app/reducers";
import SplashScreen from "react-native-splash-screen";

import AppNavigation from "./app/navigation";

export const store = createStore(reducers);

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
};

export default App;
