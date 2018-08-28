import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html',
  providers: [BluetoothSerial]
})
export class MyApp {
  rootPage:any = TabsPage;  

  constructor(bluetoothSerial:BluetoothSerial,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    //   bluetoothSerial.subscribeRawData().subscribe(
    //     data=>{
    //       console.log('subscribeRawData', data);
    //     },
    //     err=>{
    //       console.log('error subscribeRawData', err);
    //     }
    // );
    });
  }
}
