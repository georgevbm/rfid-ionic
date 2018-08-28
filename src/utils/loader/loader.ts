import { Injectable } from '@angular/core';
import { LoadingController, Platform, Loading } from 'ionic-angular';

@Injectable()
export class Loader {

    loader: Loading;

    constructor(
        public platform: Platform,
        public loading: LoadingController
    ) {
    }
    show(message?:string) {
        ("object");
        if (this.loader) {
            ("tem loader");
            this.loader.dismiss();
            ("dismiss loader");
        }

        this.loader = this.loading.create({
            content: message
        });
        ("loader criado");
        this.loader.present();
        ("show loader");
    }
    hide() {
        (this.loader);
        if (this.loader) {
            ("hide loader");
            this.loader.dismiss();
        }
    }
}