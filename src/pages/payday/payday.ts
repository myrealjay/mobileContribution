import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-payday',
  templateUrl: 'payday.html',
})
export class PaydayPage {

  oldPayDay='';
  payday:any;
  token='';
  scheme='';
  email='';
  paydays:any;
  error='';

  constructor(public navCtrl: NavController, public navParams: NavParams,public restProvider: RestProvider) {
    this.paydays=this.navParams.get('paydays');
    this.token=this.navParams.get('token');
    this.scheme=this.navParams.get('scheme');
    this.email=this.navParams.get('email');
    this.oldPayDay=this.navParams.get('oldPayDay');

    this.payday=this.paydays[0];
  }

  changePayDay(){
    this.restProvider.updatePayDay(this.token,this.scheme,this.payday,this.oldPayDay,this.email).then(data=>{
      let resp=JSON.parse(JSON.stringify(data));
      if(resp.message){
        this.navCtrl.push(HomePage);
      }
      else{
        this.error=resp.error;
      }
    });
  }

  ionViewDidLoad() {
    
  }

  back(){
    this.navCtrl.push(HomePage);
  }

}
