import { ToastController } from 'ionic-angular';
import { Injectable } from '@angular/core';

@Injectable()
export class Message {
    constructor(private toast: ToastController) {}
    notify(text?: string, time?: number, position?: string) {
        let positionParam = position || "middle";
        let timeParam = time || 2000;
        let toast = this.toast.create({
            message: text,
            duration: timeParam,
            position: positionParam,
        });
        toast.present();
    }
}