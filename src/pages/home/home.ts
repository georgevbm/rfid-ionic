import { Component, NgZone, ChangeDetectorRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { PatrimonyProvider } from '../../providers/patrimony/patrimony';
import { Loader } from '../../utils/loader/loader';
import { Message } from '../../utils/message/message';
import { R900Protocol } from '../../utils/protocol/r900Protocol'
import { Platform } from 'ionic-angular/platform/platform';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [BluetoothSerial, Loader, Message]
})
export class HomePage {

  public devices: Array<any> = [];
  public tags: Array<any> = [];
  public status: string = '';
  public showBeep: boolean = false;
  public connected: boolean = false;
  public batteryLevel: String = '';
  public inventoring: boolean = false;
  public requester: String = '';

  constructor(
    private navCtrl: NavController,
    private bluetoothSerial: BluetoothSerial,
    private patrimonyProvider: PatrimonyProvider,
    private zone: NgZone,
    private loader: Loader,
    private message: Message,
    private platform: Platform) {
      console.log(platform);
    if(this.platform.is('cordova')) this.registerSubscribeData();
  }

  public registerSubscribeData() {
    this.bluetoothSerial.subscribeRawData().subscribe((data) => {
      this.bluetoothSerial.read().then((data) => {

        if ((data.indexOf('online=0')) >= 0) {
          this.setConnection(false);
        }

        if ((data.indexOf('CONNECT F0D7AA6993CE')) >= 0) {
          this.setConnection(false);
          this.message.notify('Erro ao conectar, reinicie o device (DOTR-900) e tente novamente!');
        }

        this.parseTags(data);
        if (this.requester == 'battery') {
          this.zone.run(() => {
            // this.batteryLevel = data.slice(6, 8);
            let result = data.match(/\d+/g);
            alert(result);
            if (result && result.length) {
              this.batteryLevel = result[0];
              console.log('batteryLevel', this.batteryLevel);
            }
            this.clearRequester();
          });
        }
      });
    });
  }

  public openInterface(log: String = '', cb) {
    this.bluetoothSerial.write(R900Protocol.OPEN_INTERFACE_1).then(
      status => {
        cb(status)
      },
      err => {
        console.log('err', err);
      }
    )
  }

  public setStatus(status) {
    this.status = status;
  }

  public setRequester(param) {
    this.requester = param;
  }

  public clearRequester() {
    this.requester = '';
  }

  public clearDevices() {
    this.devices = [];
  }

  public scan() {
    this.bluetoothSerial.list().then(devicesFound => {
      this.devices = devicesFound;
    }, error => {
      console.log('error: ', error);
    });
  }

  public checkBluetothIsEnabled() {
    this.bluetoothSerial.isEnabled().then(
      data => {
        console.log('bluethothStatus =>', data);
      },
      error => {
        console.log('error: ', error);
      }
    );
  }

  public handleConnection(item) {
    if (!item) {
      return;
    }
    this.connect(item, (statusConnection) => {
      console.log('statusConnection: ', statusConnection);
      if (statusConnection == 'OK') {
        this.openInterface('from handleConnection', (statusOpenInterface) => {
          console.log('statusOpenInterface: ', statusOpenInterface);
          if (statusOpenInterface == 'OK') {
            this.zone.run(() => {
              this.connected = true;
              this.clearDevices();
            });
            this.getBatteryLevel();
          }
        })
      }
    })
  }

  public connect(item, cb) {
    if (!item) {
      return;
    }
    this.bluetoothSerial.connect(item.address).subscribe(
      status => {
        cb(status);
      },
      err => {
        this.message.notify('Error on Connecting, restart device!');
        console.log('Error on Connecting: ', err);
        this.setConnection(false);
      }
    )
  }

  public sendDislink() {
    this.bluetoothSerial.write(R900Protocol.CMD_DISLINK).then(
      data => {
        this.openInterface('Br.off', () => console.log('Br.off sucssess'));
        this.clearDevices();
        this.setConnection(false);
        this.sendDisconnectDeviceBluetooth();
        console.log('bluetoothDislink: ', data);
      },
      error => {
        console.log('error: ', error);
      }
    )
  }

  public sendDisconnectDeviceBluetooth() {
    this.bluetoothSerial.disconnect().then(
      data => {
        this.openInterface('disconnect', () => console.log('disconnect'));
        this.clearDevices();
        this.setConnection(false);
        console.log('disconnect: ', data);
      },
      error => {
        console.log('error: ', error);
      }
    )
  }

  public turnOff() {
    this.bluetoothSerial.write(R900Protocol.CMD_TURN_READER_OFF).then(
      data => {
        this.openInterface('Br.off', () => console.log('Br.off sucssess'));
        this.clearDevices();
      },
      error => {
        console.log(`There was an error: ${error}`);
      }
    );
  }

  public isConnected() {
    this.bluetoothSerial.isConnected().then(
      status => {
        console.log('isConnected=> ', status);
      },
      err => {
        console.log('error on connect: ', err);
        if (err == 'error on connect:  Device connection was lost') this.setConnection(false);
      }
    )
  }

  public setConnection(status) {
    this.zone.run(() => {
      this.connected = false;
    });
  }

  public getBatteryLevel() {
    this.bluetoothSerial.write(R900Protocol.CMD_GET_BATT_LEVEL).then(
      data => {
        this.openInterface('Br.batt', () => console.log('Br.batt sucssess'));
        this.setRequester('battery');
      },
      error => {
        console.log(`There was an error: ${error}`);
      }
    );
  }

  public toogleBeep(param) {
    this.bluetoothSerial.write(`Br.beep,${param ? 1 : 0}`).then(
      data => {
        console.log(`beep: ${param ? 'on' : 'off'}`);
        this.openInterface('Br.beep', () => {
          console.log('Br.beep sucssess')
          this.showBeep = param;
        });
      },
      err => {
        console.log('err ' + err);
      }
    )
  }

  public getVersion() {
    try {
      let deviceVersion = this.bluetoothSerial.write(R900Protocol.CMD_GET_VERSION);
      console.log(`ver: ${deviceVersion}`);
      this.setRequester('versão');
      this.openInterface(R900Protocol.CMD_GET_VERSION, () => { });
    } catch (error) {
      console.log('error', error);
    }
  }

  public getInventory() {
    console.log("getInventoryStart");
    this.bluetoothSerial.write(R900Protocol.CMD_INVENT).then(
      data => {
        this.inventoring = true;
        this.setRequester('inventário');
        this.openInterface('stop', () => { });
      },
      err => {
        console.log('err', err);
      }
    )
  }

  public stop() {
    this.bluetoothSerial.write(R900Protocol.CMD_STOP).then(
      data => {
        console.log('stop', data);
        this.inventoring = false;
        this.openInterface('stop', () => { });
      },
      err => {
        console.log('err', err);
      }
    )
  }

  public parseTags(tags) {
    let tagsSplited = tags.split('\r');

    let filteredTags = tagsSplited.filter((tag) => {
      let stringTag = new String(tag);
      return stringTag.startsWith('3') && stringTag.length == 32
    });

    filteredTags.forEach(element => {
      this.isIncluded(element.slice(22, 28), status => {
        console.log('isIncluded=> ' + element.slice(22, 28) + ' status=> ', status);

        if (!status) {
          this.getPatrimonyByTag(element.slice(22, 28), (data, err) => {
            if (err) {
              console.log('err', data)
            }
            if (data != null) {
              let tagObj = {
                patrimony: data,
                tag: element.slice(22, 28)
              };
              console.log('taaab=> ', tagObj);
              this.zone.run(() => {
                console.log('oook');
                this.tags.push(tagObj);
              });
            }
          })
        }
      })
    });
  }

  getPatrimonyByTag(tag: String, cb) {
    this.patrimonyProvider.getByTag(tag).subscribe(
      data => {
        console.log(data);
        cb(data, null);
      },
      err => {
        console.log('error: ', err);
        cb(null, err);
      }
    )
  }

  public isIncluded(element, cb) {
    let included = false;
    console.log("Length Tags:" + this.tags.length);
    for (var i = 0; i < this.tags.length; i++) {
      if (this.tags[i].tag === element) {
        included = true;
        break;
      } 
    }
    cb(included);
  }

  public clear() {
    this.tags = [];
  }

  public sendReader() {
    this.bluetoothSerial.write('s').then(
      data => {
        console.log('s', data);
        this.bluetoothSerial.subscribeRawData().subscribe((data) => {
          this.bluetoothSerial.read().then((data) => {
            console.log('pure data : ', data)
            console.log('get invertory data : ' + JSON.stringify(data))
          });
        });
      },
      err => {
        console.log('err', err);
      }
    )
  }
}


