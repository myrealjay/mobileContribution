import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';


@Component({
  selector: 'page-getpaid',
  templateUrl: 'getpaid.html',
})
export class GetpaidPage {
  paidmembers:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.paidmembers=this.navParams.get('paidmembers');
    
  }

  back(){
    this.navCtrl.push(HomePage);
  }

  ionViewDidLoad() {
   
  }

}
