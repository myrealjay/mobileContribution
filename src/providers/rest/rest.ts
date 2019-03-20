import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  LoadingController,ToastController} from 'ionic-angular';



@Injectable()
export class RestProvider {
  private loading:any;
  toast:any;
  apiUrl= 'http://localhost:8000/api';

  constructor(public http: HttpClient,public loadingCtrl: LoadingController,public toastController: ToastController) {
  
  }

  showToast(message) {
    this.toast = this.toastController.create({
      message: message,
      duration: 3000,
      cssClass:"toastcss"
    }).present();
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

  checkAvailibity(token,scheme){
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/checkAvailablity/'+scheme+'?token='+token, 
      {
        headers: { 'Content-Type': 'application/json' }
      }
      ).subscribe(data => {
        
        resolve(data);
      }, err => {
        let er=JSON.parse(JSON.stringify(err));
        //let message=er.error.message.substring(0,15).trim();
        if(er.error){
          let errmsg='';
          let ers=JSON.parse(er.error);
          for(let key in ers){
            errmsg+=ers[key][0];
          
          }
          this.showToast(errmsg);
        }
        
      });
    });
  }

  newScheme(token,fullname,amount,members,startdate,enddate,paydays,selpayday){
    this.presentLoadingDefault();
    return new Promise(resolve => {
      this.http.post(this.apiUrl+'/new_scheme?token='+token,
      { 
        Name : fullname,
        Amount: amount,
        Members:members,
        startdate:startdate,
        enddate:enddate,
        paydays:paydays,
        selpayday:selpayday,
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
           
          }
          this.showToast(errmsg);
        }
        
      });
    });
  }

  myScheme(token){
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/MyScheme?token='+token, 
      {
        headers: { 'Content-Type': 'application/json' }
      }
      ).subscribe(data => {
        
        resolve(data);
      }, err => {
        let er=JSON.parse(JSON.stringify(err));
        //let message=er.error.message.substring(0,15).trim();
        if(er.error){
          let errmsg='';
          let ers=JSON.parse(er.error);
          for(let key in ers){
            errmsg+=ers[key][0];
          
          }
          this.showToast(errmsg);
        }
        
      });
    });
  }

  schemeMembers(token,scheme){
    
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/schemeMembers/'+scheme+'?token='+token, 
      {
        headers: { 'Content-Type': 'application/json' }
      }
      ).subscribe(data => {
        
        resolve(data);
      }, err => {
        let er=JSON.parse(JSON.stringify(err));
        //let message=er.error.message.substring(0,15).trim();
        if(er.error){
          let errmsg='';
          let ers=JSON.parse(er.error);
          for(let key in ers){
            errmsg+=ers[key][0];
          
          }
          this.showToast(errmsg);
        }
        
      });
    });
  }

  checkJoined(token,scheme){
    
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/checkJoined/'+scheme+'?token='+token, 
      {
        headers: { 'Content-Type': 'application/json' }
      }
      ).subscribe(data => {
        
        resolve(data);
      }, err => {
        let er=JSON.parse(JSON.stringify(err));
        //let message=er.error.message.substring(0,15).trim();
        if(er.error){
          let errmsg='';
          let ers=JSON.parse(er.error);
          for(let key in ers){
            errmsg+=ers[key][0];
            
          }
          this.showToast(errmsg);
        }
        
      });
    });
  }

  payDays(token,num,scheme){
    
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/getPayDays/'+num+'?token='+token+'&scheme='+scheme, 
      {
        headers: { 'Content-Type': 'application/json' }
      }
      ).subscribe(data => {
       
        resolve(data);
      }, err => {
        let er=JSON.parse(JSON.stringify(err));
        //let message=er.error.message.substring(0,15).trim();
        if(er.error){
          let errmsg='';
          let ers=JSON.parse(er.error);
          for(let key in ers){
            errmsg+=ers[key][0];
            
          }
          this.showToast(errmsg);
        }
        
      });
    });
  }

  getPaid(token,scheme){
   
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/getPayment/'+scheme+'?token='+token, 
      {
        headers: { 'Content-Type': 'application/json' }
      }
      ).subscribe(data => {
        
        resolve(data);
      }, err => {
        let er=JSON.parse(JSON.stringify(err));
        //let message=er.error.message.substring(0,15).trim();
        if(er.error){
          let errmsg='';
          let ers=JSON.parse(er.error);
          for(let key in ers){
            errmsg+=ers[key][0];
            
          }
          this.showToast(errmsg);
        }
        
      });
    });
  }

  getActiveMembers(token,scheme){
   
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/activeMembers/'+scheme+'?token='+token, 
      {
        headers: { 'Content-Type': 'application/json' }
      }
      ).subscribe(data => {
        
        resolve(data);
      }, err => {
        let er=JSON.parse(JSON.stringify(err));
        //let message=er.error.message.substring(0,15).trim();
        if(er.error){
          let errmsg='';
          let ers=JSON.parse(er.error);
          for(let key in ers){
            errmsg+=ers[key][0];
           
          }
          this.showToast(errmsg);
        }
        
      });
    });
  }

  register(name,email,phone,password,bank,accountno){
    this.presentLoadingDefault();
    return new Promise(resolve => {
      this.http.post(this.apiUrl+'/register',
      { 
        email : email,
        password: password,
        name:name,
        phone:phone,
        platform:2,
        bank:bank,
        accountno:accountno
        
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
           
          }
          this.showToast(errmsg);
        }
        
      });
    });
  }


  join(token,scheme,name,email,phone,amount,payday){
    this.presentLoadingDefault();
    return new Promise(resolve => {
      this.http.post(this.apiUrl+'/join?token='+token,
      { 
        email : email,
        name:name,
        phone:phone,
        scheme:scheme,
        amount:amount,
        payday:payday,
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
           
          }
          this.showToast(errmsg);
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
           
          }
          this.showToast(errmsg);
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
        
          }
          this.showToast(errmsg);
        }
        
      });
    });
  }

  verify(token,usertoken){
   
    return new Promise(resolve => {
      this.http.post(this.apiUrl+'/verifynow?token='+usertoken,
      { 
        token : token,
      }, 
      {
        headers: { 'Content-Type': 'application/json' }
      }
      ).subscribe(data => {
       
        resolve(data);
      }, err => {
        let er=JSON.parse(JSON.stringify(err));
        //let message=er.error.message.substring(0,15).trim();
        if(er.error){
          let errmsg='';
          let ers=JSON.parse(er.error);
          for(let key in ers){
            errmsg+=ers[key][0];
            
          }
          this.showToast(errmsg);
        }
        
      });
    });
  }

  checkauth(token){
    
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/user?token='+token,
      {
        headers: { 'Content-Type': 'application/json' }
      }
      ).subscribe(data => {
        
        resolve(data);
      }, err => {
        let er=JSON.parse(JSON.stringify(err));
        //let message=er.error.message.substring(0,15).trim();
        if(er.error){
          let errmsg='';
          let ers=JSON.parse(er.error);
          for(let key in ers){
            errmsg+=ers[key][0];
            
          }
          this.showToast(errmsg);
        }
        
      });
    });
  }
  
  verifypayment(reference){
    return new Promise(resolve => {
      this.http.get('https://api.paystack.co/transaction/verify/'+reference,
      {
        headers: { 'Content-Type': 'application/json' ,'Authorization': 'Bearer sk_test_7886fc90b896993395fbc27c623cacdf2bbf0bf6'}
      }
      ).subscribe(data => {
       
        resolve(data);
      }, err => {
        let er=JSON.parse(JSON.stringify(err));
        if(er.status==500){
          this.showToast("Oops! something went wrong");
        }
        if(er.status==401){
          this.showToast("Your session has expired, please login again");
        }
        if(er.status==0){
          this.showToast("Please check your connection");
        }
      });
    });
  }

  getSchemeMember(token,scheme){
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/getSchemeMember/'+scheme+'?token='+token,
      {
        headers: { 'Content-Type': 'application/json' }
      }
      ).subscribe(data => {
        
        resolve(data);
      }, err => {
        let er=JSON.parse(JSON.stringify(err));
        if(er.status==500){
          this.showToast("Oops! something went wrong");
        }
        if(er.status==401){
          this.showToast("Your session has expired, please login again");
        }
        if(er.status==0){
          this.showToast("Please check your connection");
        }
      });
    });
  }

  addpayment(token,scheme_member_id,scheme,amount,authcode){
    this.presentLoadingDefault();
    return new Promise(resolve => {
      this.http.post(this.apiUrl+'/pay?token='+token,
      { 
        scheme_member_id : scheme_member_id,
        scheme: scheme,
        amount:amount,
        authcode:authcode,
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
            
          }
          this.showToast(errmsg);
        }
        
      });
    });
  }

  getUnallocatedDays(token,scheme){
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/getUnallocatedDays/?scheme='+scheme+'&token='+token,
      {
        headers: { 'Content-Type': 'application/json' }
      }
      ).subscribe(data => {
        
        resolve(data);
      }, err => {
        let er=JSON.parse(JSON.stringify(err));
        if(er.status==500){
          this.showToast("Oops! something went wrong");
        }
        if(er.status==401){
          this.showToast("Your session has expired, please login again");
        }
        if(er.status==0){
          this.showToast("Please check your connection");
        }
      });
    });
  }

  updatePayDay(token,scheme,payday,oldPayDay,email){
    this.presentLoadingDefault();
    return new Promise(resolve => {
      this.http.post(this.apiUrl+'/updatePayDay?token='+token,
      { 
        scheme: scheme,
        payday:payday,
        oldPayDay:oldPayDay,
        email:email
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
           
          }
          this.showToast(errmsg);
        }
        
      });
    });
  }

  checkBvn(token){
    this.presentLoadingDefault();
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/checkBvn/?token='+token,
      {
        headers: { 'Content-Type': 'application/json' }
      }
      ).subscribe(data => {
        this.loading.dismiss();
        resolve(data);
      }, err => {
        let er=JSON.parse(JSON.stringify(err));
        if(er.status==500){
          this.showToast("Oops! something went wrong");
        }
        if(er.status==401){
          this.showToast("Your session has expired, please login again");
        }
        if(er.status==0){
          this.showToast("Please check your connection");
        }
      });
    });
  }

  checkBvnPayment(token,scheme){
    this.presentLoadingDefault();
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/checkBvnPayment/?scheme='+scheme+'&token='+token,
      {
        headers: { 'Content-Type': 'application/json' }
      }
      ).subscribe(data => {
        this.loading.dismiss();
        resolve(data);
      }, err => {
        let er=JSON.parse(JSON.stringify(err));
        if(er.status==500){
          this.showToast("Oops! something went wrong");
        }
        if(er.status==401){
          this.showToast("Your session has expired, please login again");
        }
        if(er.status==0){
          this.showToast("Please check your connection");
        }
      });
    });
  }

  
  makeBvnPayment(token,amount,authcode,scheme){
    this.presentLoadingDefault();
      return new Promise(resolve => {
        this.http.post(this.apiUrl+'/makeBvnPayment/?token='+token,
        {
          amount:amount,
          authcode:authcode,
          scheme:scheme,
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
        ).subscribe(data => {
          this.loading.dismiss();
          resolve(data);
        }, err => {
          let er=JSON.parse(JSON.stringify(err));
          if(er.status==500){
            this.showToast("Oops! something went wrong");
          }
          if(er.status==401){
            this.showToast("Your session has expired, please login again");
          }
          if(er.status==0){
            this.showToast("Please check your connection");
          }
        });
      });
    
  }

  getBvn(token,bvn){
    this.presentLoadingDefault();
      return new Promise(resolve => {
        this.http.post(this.apiUrl+'/getBvn/?token='+token,
        {
          bvn:bvn,
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
        ).subscribe(data => {
          this.loading.dismiss();
          resolve(data);
        }, err => {
          let er=JSON.parse(JSON.stringify(err));
          if(er.status==500){
            this.showToast("Oops! something went wrong");
          }
          if(er.status==401){
            this.showToast("Your session has expired, please login again");
          }
          if(er.status==0){
            this.showToast("Please check your connection");
          }
        });
      });
    
  }

}
