import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { RestProvider } from '../../providers/rest/rest';

@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private storage: Storage,public restProvider: RestProvider) {
    this.storage.remove("token");
    this.storage.remove("user");
    this.navCtrl.push(LoginPage);
    this.restProvider.showToast('You successfully logged out');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogoutPage');
  }

}
