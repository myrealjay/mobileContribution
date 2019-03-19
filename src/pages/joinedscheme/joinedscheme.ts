import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import { GetpaidPage } from '../getpaid/getpaid';
import { PaydayPage } from '../payday/payday';



@Component({
  selector: 'page-joinedscheme',
  templateUrl: 'joinedscheme.html',
})
export class JoinedschemePage {
  scheme:any;
  name='';
  token='';
  amount='';
  members:any;
  memberLen=0;
  status=0;
  user:any;
  takehome=0;
  actives:any;
  email='';
  paydays:any;
  payday='';

  activelen=0;
  error='';
  schemeMember:any;
 

  constructor(public navCtrl: NavController, public navParams: NavParams,public restProvider: RestProvider,private storage: Storage) {
    this.scheme=this.navParams.get('scheme');
    
    this.storage.get("token").then(data=>{
      if(data){
        this.token=data;
        this.checkauth(data);
      }
    });
    this.storage.get("user").then(data=>{
      if(data){
        if(data){
          this.user=data;
          this.email=this.user.email;
        }
  
      }
    });
  }

  changePayDay(){
    let my=this;
      this.restProvider.getUnallocatedDays(this.token,this.name).then(data=>{
          let resp=JSON.parse(JSON.stringify(data)).paydays;
          if(resp.length<1) {
            this.error='No date available';
          }
          else{
            this.restProvider.getSchemeMember(my.token,my.name).then(data=>{
              let resp2=JSON.parse(JSON.stringify(data));
              if(resp2.member){
                let schemeMember=resp2.member;
                //my.payWithPaystack(this.scheme.Amount,this.schemeMember.id,this.name);
                my.navCtrl.push(PaydayPage,{paydays:resp,token:my.token,scheme:my.name,email:my.email,oldPayDay:schemeMember.payday});
              }
            });
            
          }
      });
  }

  checkauth(token){
    this.restProvider.checkauth(token).then(data=>{
      let resp=JSON.parse(JSON.stringify(data));
      
      if(!resp.user){
        this.restProvider.showToast('Your session has expired');
        this.navCtrl.push(LoginPage);
      }
      else{
        if(this.scheme){
          this.name=this.scheme.scheme;
          this.amount=this.scheme.amount;
          
          this.getMembers();
        }
      }
      
    });
  }

  getMembers(){
    this.restProvider.schemeMembers(this.token,this.name).then(data=>{
      let resp=JSON.parse(JSON.stringify(data)).members;
      this.members=resp;
      this.memberLen=this.members.length;
      this.checkJoined();
      
    });
  }

  checkJoined(){
    this.restProvider.checkJoined(this.token,this.name).then(data=>{
      let resp=JSON.parse(JSON.stringify(data));
      this.status=resp.message;
      this.getActiveMembers();
     
    })
  }

  join(){
      let my=this;

      this.restProvider.checkBvnPayment(this.token,this.name).then(data=>{
        let resp=JSON.parse(JSON.stringify(data));
        if(resp.success){
          //bvn is saved meaning payment was made earlier 
          //go ahead and create a scheme
          my.doJoin();
        }
        else{

          //payment was not made so you need to pay

          my.payWithPaystackBvn(100);
        }
    });
  
  }

  payWithPaystackBvn(amount){
    let realAmount=amount;
    amount=Number(amount)*100;
    let my=this;
    var handler = (<any>window).window.PaystackPop.setup({
      key: 'pk_test_0c2547ff14558a10ac69ea4d24be731720d1c067',
      email: my.user.email,
      amount: amount,
      callback: function(response){
        my.restProvider.verifypayment(response.reference).then(res=>{
          var authcode=JSON.parse(JSON.stringify(res)).data.authorization.authorization_code;

          //save payment details

          my.restProvider.makeBvnPayment(my.token,realAmount,authcode,my.name).then(res=>{
              let resp2=JSON.parse(JSON.stringify(res));
              if(resp2.success){

                //after saving payment create the scheme
                my.doJoin();
              }
              else{
                my.error='payment did not save successfully';
              }
          });
          
        });
         
          
      },
      onClose: function(){
        this.restProvider.showToast('Your payment has called');
      }
    })
    handler.openIframe();
  }

  doJoin(){
    this.restProvider.join(this.token,this.name,this.user.name,this.user.email,this.user.phone,this.amount,this.payday).then(data=>{
      let resp=JSON.parse(JSON.stringify(data));
      if(resp.message){
        this.restProvider.showToast('You have joined '+this.name+'successfully');
        this.navCtrl.push(HomePage);
      }
      else{
        this.error=resp.error;
      }
    });
  }

  getActiveMembers(){
    this.restProvider.getActiveMembers(this.token,this.name).then(data=>{
      let resp=JSON.parse(JSON.stringify(data)).members;
      if(resp.length>0){
        let amount=resp[0].amount;
        let num=resp.length;
        let total=amount*num;
        this.takehome=total-((2.5/100)*total);
      }
      
        this.getPayDays();
      
     
      this.actives=resp;
      this.activelen=resp.length;
      
    });
  }

  getPayDays(){
    this.restProvider.payDays(this.token,this.memberLen,this.name).then(data=>{
      let resp=JSON.parse(JSON.stringify(data)).paydays;
      this.paydays=resp;
      this.payday=this.paydays[0];
     
    });
  }


  back(){
    this.navCtrl.push(HomePage);
  }

  paymentDetails(){
    this.restProvider.getPaid(this.token,this.name).then(data=>{
      let resp=JSON.parse(JSON.stringify(data));
      if(resp.payment){
        this.navCtrl.push(GetpaidPage,{paidmembers:resp.payment});
      }
      else{
        this.error='No payment yet';
      }
    });
  }

  pay(){
    let my=this;
    this.restProvider.getSchemeMember(this.token,this.name).then(data=>{
      let resp2=JSON.parse(JSON.stringify(data));
      if(resp2.member){
        this.schemeMember=resp2.member;
        my.payWithPaystack(this.amount,this.schemeMember.id,this.name);
      }
    });
  }


  payWithPaystack(amount,scheme_member_id,scheme){
    let realAmount=amount;
    amount=Number(amount)*100+((1.5/100)*Number(amount)*100);
    let my=this;
    var handler = (<any>window).window.PaystackPop.setup({
      key: 'pk_test_0c2547ff14558a10ac69ea4d24be731720d1c067',
      email: my.email,
      amount: amount,
      callback: function(response){
        my.restProvider.verifypayment(response.reference).then(res=>{
          var authcode=JSON.parse(JSON.stringify(res)).data.authorization.authorization_code;
          my.restProvider.addpayment(my.token,scheme_member_id,scheme,realAmount,authcode).then(data=>{
            my.restProvider.showToast('Your payment was successful');
          });
        });
         
          
      },
      onClose: function(){
        this.restProvider.showToast('Your payment was canceled');
      }
    })
    handler.openIframe();
  }


  ionViewDidLoad() {
    
  }

}
