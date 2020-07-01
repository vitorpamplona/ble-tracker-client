/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import BackgroundFetch from "react-native-background-fetch";

import BackgroundTaskServices from "./app/services/BackgroundTaskService";
import { executeTask } from "./app/services/BackgroundTaskService";

let MyHeadlessTask = async ({ taskId }) => {
  console.log("[BackgroundService] Headless Task start: ", taskId);
  executeTask();
  console.log("[BackgroundService] Headless Task finish: ", taskId);

  // Required:  Signal to native code that your task is complete.
  // If you don't do this, your app could be terminated and/or assigned
  // battery-blame for consuming too much time in background.
  BackgroundFetch.finish(taskId);
};

// Register your BackgroundFetch HeadlessTask
BackgroundFetch.registerHeadlessTask(MyHeadlessTask);

AppRegistry.registerComponent(appName, () => App);

BackgroundTaskServices.start();
