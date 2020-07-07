import PushNotification from "react-native-push-notification";
import { Platform } from "react-native";

class NotificationHandler {
  onNotification(notification) {
    console.log("NotificationHandler:", notification);

    if (typeof this._onNotification === "function") {
      this._onNotification(notification);
    }
  }

  onRegister(token) {
    console.log("NotificationHandler:", token);

    if (typeof this._onRegister === "function") {
      this._onRegister(token);
    }
  }

  attachRegister(handler) {
    this._onRegister = handler;
  }

  attachNotification(handler) {
    this._onNotification = handler;
  }
}

const handler = new NotificationHandler();

PushNotification.configure({
  onRegister: handler.onRegister.bind(handler),
  onNotification: handler.onNotification.bind(handler),

  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  popInitialNotification: true,
  requestPermissions: Platform.OS === "ios",
});

export default handler;
