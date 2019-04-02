import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AddmembersPage } from '../addmembers/addmembers';
import { RestProvider } from '../../providers/rest/rest';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { GetpaidPage } from '../getpaid/getpaid';
import { PaydayPage } from '../payday/payday';


@Component({
  selector: 'page-createdscheme',
  templateUrl: 'createdscheme.html',
})
export class CreatedschemePage {

  scheme:any;
  name='';
  token='';
  members:any;
  memberLen=0;
  status=0;
  takehome=0;
  actives:any;
  activelen=0;
  schemeMember:any;
  email='';
  error='';
  added_mem=0;

  constructor(public navCtrl: NavController, public navParams: NavParams,public restProvider: RestProvider,private storage: Storage) {
    this.scheme=this.navParams.get('scheme');
    this.added_mem=this.scheme.mem_added;
    this.name=this.scheme.Name;
    
    this.storage.get("token").then(data=>{
      if(data){
        this.token=data;
        this.checkauth(data);
      }
    });

    this.storage.get("user").then(data=>{
      if(data){
        if(data){
          this.email=data.email;
        }
  
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
        this.getMembers();
        
      }
      
    });
  }

  checkJoined(){
    this.restProvider.checkJoined(this.token,this.name).then(data=>{
      let resp=JSON.parse(JSON.stringify(data));
      this.status=resp.member;
    })
  }

  addmembers(){
    
    this.navCtrl.push(AddmembersPage,{members:this.scheme.Members,id:this.scheme.id,name:this.scheme.Name,amount:this.scheme.Amount});
  }

  getMembers(){
    this.restProvider.schemeMembers(this.token,this.name).then(data=>{
      let resp=JSON.parse(JSON.stringify(data)).members;
      this.members=resp;
      this.memberLen=this.members.length;
      this.getActiveMembers();
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
      this.actives=resp;
      this.activelen=resp.length;
      
    });
  }
  back(){
    this.navCtrl.push(HomePage);
  }


  pay(){
    let my=this;
    this.restProvider.getSchemeMember(this.token,this.name).then(data=>{
      let resp2=JSON.parse(JSON.stringify(data));
      if(resp2.member){
        this.schemeMember=resp2.member;
        my.payWithPaystack(this.scheme.Amount,this.schemeMember.id,this.name);
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
          my.restProvider.showToast('Payment canceled');
      }
    })
    handler.openIframe();
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


  ionViewDidLoad() {
 
  }

}
