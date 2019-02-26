import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  LoadingController} from 'ionic-angular';
import { RegisterPage } from '../../pages/register/register';



@Injectable()
export class RestProvider {
  private loading:any;
  apiUrl= 'http://localhost:8000/api';

  constructor(public http: HttpClient,public loadingCtrl: LoadingController) {
    console.log('Hello RestProvider Provider');
  }

  //loading animation
  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="assets/imgs/spin.gif" width="100" />`,
      duration: 10000,
    });
    this.loading.present();
  }

  register(name,email,phone,password){
    this.presentLoadingDefault();
    return new Promise(resolve => {
      this.http.post(this.apiUrl+'/register',
      { 
        email : email,
        password: password,
        name:name,
        phone:phone,
        
      }, 
      {
        headers: { 'Content-Type': 'application/json' }
      }
      ).subscribe(data => {
        this.loading.dismiss();
        resolve(data);
      }, err => {
        let er=JSON.parse(JSON.stringify(err));
        //let message=er.error.message.substring(0,15).trim();
        if(er.error){
          let errmsg='';
          let ers=JSON.parse(er.error);
          for(let key in ers){
            errmsg+=ers[key][0];
            console.log(ers[key][0]);
          }
          alert(errmsg);
          RegisterPage.prototype.error=errmsg;
        }
        
      });
    });
  }

  login(email,password){
    this.presentLoadingDefault();
    return new Promise(resolve => {
      this.http.post(this.apiUrl+'/login',
      { 
        email : email,
        password: password,
        
      }, 
      {
        headers: { 'Content-Type': 'application/json' }
      }
      ).subscribe(data => {
        this.loading.dismiss();
        resolve(data);
      }, err => {
        let er=JSON.parse(JSON.stringify(err));
        //let message=er.error.message.substring(0,15).trim();
        if(er.error){
          let errmsg='';
          let ers=JSON.parse(er.error);
          for(let key in ers){
            errmsg+=ers[key][0];
            console.log(ers[key][0]);
          }
          alert(errmsg);
          RegisterPage.prototype.error=errmsg;
        }
        
      });
    });
  }

  verify(token,usertoken){
    this.presentLoadingDefault();
    return new Promise(resolve => {
      this.http.post(this.apiUrl+'/verifynow?token='+usertoken,
      { 
        token : token,
      }, 
      {
        headers: { 'Content-Type': 'application/json' }
      }
      ).subscribe(data => {
        this.loading.dismiss();
        resolve(data);
      }, err => {
        let er=JSON.parse(JSON.stringify(err));
        //let message=er.error.message.substring(0,15).trim();
        if(er.error){
          let errmsg='';
          let ers=JSON.parse(er.error);
          for(let key in ers){
            errmsg+=ers[key][0];
            console.log(ers[key][0]);
          }
          alert(errmsg);
        }
        
      });
    });
  }

  checkauth(token){
    this.presentLoadingDefault();
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/user?token='+token,
      {
        headers: { 'Content-Type': 'application/json' }
      }
      ).subscribe(data => {
        this.loading.dismiss();
        resolve(data);
      }, err => {
        let er=JSON.parse(JSON.stringify(err));
        //let message=er.error.message.substring(0,15).trim();
        if(er.error){
          let errmsg='';
          let ers=JSON.parse(er.error);
          for(let key in ers){
            errmsg+=ers[key][0];
            console.log(ers[key][0]);
          }
          alert(errmsg);
        }
        
      });
    });
  }
  

}
