import { Component } from '@angular/core';
import { NavController ,Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
import { NewschemePage } from '../newscheme/newscheme';
import { SchemesPage } from '../schemes/schemes';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  scheme='';
  name='';
  
  constructor(public navCtrl: NavController,public platform:Platform,private storage: Storage,public restProvider: RestProvider) {
      
  }

  newScheme(){
    this.navCtrl.push(NewschemePage);
  }

  mySchemes(){
    this.navCtrl.push(SchemesPage);
  }


  signin(){
    console.log(this.scheme);
  }

}
