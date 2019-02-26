import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { RestProvider } from '../../providers/rest/rest';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Storage } from '@ionic/storage';



@Component({
  selector: 'page-verify',
  templateUrl: 'verify.html',
})
export class VerifyPage {
  authForm: FormGroup;
  token='';
  user_token='';
  error='';

  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder,public restProvider: RestProvider
    ,private storage: Storage) {
    this.authForm = formBuilder.group({
      token: ['', Validators.compose([Validators.required])]
    });
    this.storage.get('token').then(data=>{
      this.user_token=data;
    });
  }

  onSubmit(){ 
    console.log('token',this.user_token);
    this.restProvider.verify(this.token,this.user_token)
    .then(data => {
      var result=JSON.parse(JSON.stringify(data));
      if(result.message){
        if(result.message=="successful"){
          this.navCtrl.push(HomePage);
        }
      }
      else{
        console.log(result);
        if(result.status){
          this.error=result.status;
        }
      }
    });
  }

  wipeError(){
    this.error='';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerifyPage');
  }

}
