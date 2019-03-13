import { Component, ComponentFactoryResolver } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { CreatedschemePage } from '../createdscheme/createdscheme';
import { JoinedschemePage } from '../joinedscheme/joinedscheme';
import { HomePage } from '../home/home';


@Component({
  selector: 'page-schemes',
  templateUrl: 'schemes.html',
})
export class SchemesPage {
  token='';

  myschemes:any;
  joined:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public restProvider: RestProvider,private storage: Storage) {
   
    this.storage.get("token").then(data=>{
      if(data){
        this.checkauth(data);
        this.token=data;
        
      }
    });
  }

  checkauth(token){
    this.restProvider.checkauth(token).then(data=>{
      let resp=JSON.parse(JSON.stringify(data));
      
      if(!resp.user){
        this.navCtrl.push(LoginPage);
      }
      else{
        this.myScheme();
      }
      
    });
  }

  myScheme(){
    this.restProvider.myScheme(this.token).then(data=>{
      let resp=JSON.parse(JSON.stringify(data));
      this.myschemes=resp.my_scheme;
      this.joined=resp.scheme;
    });
  }

  createdScheme(scheme){
    this.navCtrl.push(CreatedschemePage,{scheme:scheme});
  }
  joinedScheme(scheme){
    this.navCtrl.push(JoinedschemePage,{scheme:scheme});
  }

  ionViewDidLoad() {
  
  }
  back(){
    this.navCtrl.push(HomePage);
  }

}
