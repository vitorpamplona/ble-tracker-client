import BLEAdvertiser from 'react-native-ble-advertiser'

export default class BLEBackgroundService {
    

    static init(uuid) {
        
    }

    static start(uuid) {
      console.log(uuid, "Starting Advertising");
      BLEAdvertiser.broadcast(uuid, [12,23,56], {})
      .then((sucess) => {
        console.log(uuid, "Adv Successful", sucess);
      }).catch(error => {
        console.log(uuid, "Adv Error", error); 
      });
      
      console.log(uuid, "Starting Scanner");
      BLEAdvertiser.scan([12,23,56], {})
      .then((sucess) => {
        console.log(uuid, "Scan Successful", sucess);
      }).catch(error => {
        console.log(uuid, "Scan Error", error); 
      });
    }

    static stop(uuid){
      console.log(uuid, "Stopping Broadcast");
      BLEAdvertiser.stopBroadcast()
        .then((sucess) => {
          console.log(uuid, "Stop Broadcast Successful", sucess);
        }).catch(error => {
          console.log(uuid, "Stop Broadcast Error", error); 
        });

      console.log(uuid, "Stopping Scanning");
      BLEAdvertiser.stopScan()
        .then((sucess) => {
          console.log(uuid, "Stop Scan Successful", sucess);
        }).catch(error => {
          console.log(uuid, "Stop Scan Error", error); 
        });
    }
}