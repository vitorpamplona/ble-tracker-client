import BackgroundFetch from 'react-native-background-fetch';
import { sync } from '../helpers/SyncDB';
import BLEBackgroundService from '../services/BLEBackgroundService'

const INTERVAL = 15; // the value is received in minutes
const TASK_ID = "com.transistorsoft.childrenshospital.contacttracer.pulse";

export function executeTask() {
  console.log("Background => Sync");
  sync();
  console.log("Background => Pulse");
  BLEBackgroundService.pulse();
  console.log("Finished Execute Task");
}

let MyHeadlessTask = async ({ taskId }) => {
  console.log('[BackgroundFetch HeadlessTask] start: ', taskId);
  executeTask();
  console.log('[BackgroundFetch HeadlessTask] finish: ', taskId);

  // Required:  Signal to native code that your task is complete.
  // If you don't do this, your app could be terminated and/or assigned
  // battery-blame for consuming too much time in background.
  BackgroundFetch.finish(taskId);
}

export const scheduleTask = async() => {
  try {
    await BackgroundFetch.scheduleTask({
      taskId: TASK_ID,
      stopOnTerminate: false,
      enableHeadless: true,
      delay: 5000,               // milliseconds (5s)
      forceAlarmManager: false,   // more precise timing with AlarmManager vs default JobScheduler
      periodic: false            // Fire once only.
    });
  } catch (e) {
    console.warn('[BackgroundFetch] scheduleTask fail', e);
  }
}

export default class BackgroundTaskServices {
  static start() {
    // Configure it.
    console.log('Configuring Background Task object');
    BackgroundFetch.configure(
      {
        minimumFetchInterval: INTERVAL,
        // Android options
        forceAlarmManager: false, // <-- Set true to bypass JobScheduler.
        stopOnTerminate: false,
        startOnBoot: true,
        requiredNetworkType: BackgroundFetch.NETWORK_TYPE_NONE, // Default
        requiresCharging: false, // Default
        requiresDeviceIdle: false, // Default
        requiresBatteryNotLow: false, // Default
        requiresStorageNotLow: false, // Default
        enableHeadless: true,
      },
      async (taskId) => {
        console.log('[BackgroundFetch ForegroundTask] start: ', taskId);
        executeTask();

        // If it comes from the Scheduler, start it again. 
        if (taskId === 'react-native-background-fetch') {
          // Test initiating a #scheduleTask when the periodic fetch event is received.
          try {
            console.log('[BackgroundFetch ForegroundTask] scheduling task again: ');
            await scheduleTask();
          } catch (e) {
            console.warn('[BackgroundFetch] scheduleTask falied', e);
          }
        }

        console.log('[BackgroundFetch ForegroundTask] start: ', taskId);
        BackgroundFetch.finish(taskId);
      },
      error => {
        console.log('RNBackgroundFetch failed to start', error);
      },
    );

    // Optional: Query the authorization status.
    BackgroundFetch.status((status) => {
        switch(status) {
        case BackgroundFetch.STATUS_RESTRICTED:
            console.log("BackgroundFetch restricted");
            break;
        case BackgroundFetch.STATUS_DENIED:
            console.log("BackgroundFetch denied");
            break;
        case BackgroundFetch.STATUS_AVAILABLE:
            console.log("BackgroundFetch is enabled");
            break;
        }
    });

   // Register your BackgroundFetch HeadlessTask
    BackgroundFetch.registerHeadlessTask(MyHeadlessTask);

    BackgroundFetch.start();
 
    scheduleTask();

    executeTask();
  }

  static stop() {
    //BackgroundFetch.stop();
  }
}
