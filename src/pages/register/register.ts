import { Component } from '@angular/core';
import {  NavController, NavParams,Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { VerifyPage } from '../verify/verify';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  authForm: FormGroup;

  name='';
  password='';
  phone='';
  email='';
  public error='';

  constructor(public navCtrl: NavController, public navParams: NavParams,private storage: Storage,
    public platform:Platform,public formBuilder: FormBuilder,public restProvider: RestProvider) {
      this.authForm = formBuilder.group({
        name: ['', Validators.compose([Validators.required])],
        password: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        phone: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]+')])],
        email: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9\.]+@[a-zA-Z0-9\.]+[\.][a-zA-Z0-9\.]+'), Validators.minLength(5), Validators.maxLength(100)])]
      });
  }


  onSubmit(){ 
    this.restProvider.register(this.name,this.email,this.phone,this.password)
    .then(data => {
      var result=JSON.parse(JSON.stringify(data));
      if(result.token){
        this.storage.set('token',result.token);
        this.storage.set('user',result.user);
        this.navCtrl.push(VerifyPage);
      }
      else{
        let errmsg='';
        let ers=JSON.parse(result);
        console.log('json',ers);
    
        for(let key in ers){
          errmsg+='<p>'+ers[key][0]+'</p>';
          console.log(ers[key][0])
        }

        this.error=errmsg;
      }
      
    });
  }


  login(){
    this.navCtrl.push(LoginPage);
  }

  wipeError(){
    this.error='';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  

}