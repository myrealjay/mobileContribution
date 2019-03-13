import { Component } from '@angular/core';
import { NavController ,Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
import { NewschemePage } from '../newscheme/newscheme';
import { SchemesPage } from '../schemes/schemes';
import { BvnPage } from '../bvn/bvn';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  scheme='';
  name='';
  token='';
  user:any;
  
  constructor(public navCtrl: NavController,public platform:Platform,private storage: Storage,public restProvider: RestProvider) {
    this.storage.get("token").then(data=>{
      this.token=data;
      this.storage.get("user").then(data=>{
        this.user=data;
      });
      
    });    
  }

  newScheme(){
    this.restProvider.checkBvn(this.token).then(data=>{
      let resp=JSON.parse(JSON.stringify(data));
      if(resp.success){
        this.navCtrl.push(NewschemePage);
      }
      else{
        this.navCtrl.push(BvnPage);
      }
    });
    
  }

  mySchemes(){
    this.restProvider.checkBvn(this.token).then(data=>{
      let resp=JSON.parse(JSON.stringify(data));
      if(resp.success){
        this.navCtrl.push(SchemesPage);
      }
      else{
        this.navCtrl.push(BvnPage);
      }
    });
    
  }


  signin(){
    console.log(this.scheme);
  }

}
