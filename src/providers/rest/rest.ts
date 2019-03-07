import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  LoadingController} from 'ionic-angular';



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

  newScheme(token,fullname,amount,members){
    this.presentLoadingDefault();
    return new Promise(resolve => {
      this.http.post(this.apiUrl+'/new_scheme?token='+token,
      { 
        Name : fullname,
        Amount: amount,
        Members:members,
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

  myScheme(token){
    this.presentLoadingDefault();
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/MyScheme?token='+token, 
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

  schemeMembers(token,scheme){
    this.presentLoadingDefault();
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/schemeMembers/'+scheme+'?token='+token, 
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

  checkJoined(token,scheme){
    this.presentLoadingDefault();
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/checkJoined/'+scheme+'?token='+token, 
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

  getActiveMembers(token,scheme){
    this.presentLoadingDefault();
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/activeMembers/'+scheme+'?token='+token, 
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
        }
        
      });
    });
  }


  join(token,scheme,name,email,phone,amount){
    this.presentLoadingDefault();
    return new Promise(resolve => {
      this.http.post(this.apiUrl+'/join?token='+token,
      { 
        email : email,
        name:name,
        phone:phone,
        scheme:scheme,
        amount:amount,
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

  Regmembers(token,scheme,name,email,phone,amount){
    this.presentLoadingDefault();
    return new Promise(resolve => {
      this.http.post(this.apiUrl+'/RegMember?token='+token,
      { 
        scheme:scheme,
        email : email,
        phone: phone,
        name:name,
        amount:amount 
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
