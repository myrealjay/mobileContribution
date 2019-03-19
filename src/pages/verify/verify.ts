import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { RestProvider } from '../../providers/rest/rest';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Storage } from '@ionic/storage';
import { BvnPage } from '../bvn/bvn';



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
    
    this.restProvider.verify(this.token,this.user_token)
    .then(data => {
      var result=JSON.parse(JSON.stringify(data));
      if(result.message){
        if(result.message=="successful"){
          this.restProvider.showToast('Your email was successfully verified');
          this.navCtrl.push(BvnPage);
        }
      }
      else{
        
        if(result.status){
          this.error=result.status;
        }
        else{
          this.error=result[0];
        }
      }
    });
  }

  wipeError(){
    this.error='';
  }

  ionViewDidLoad() {
   
  }

}
