import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-bvn',
  templateUrl: 'bvn.html',
})
export class BvnPage {
  authForm: FormGroup;
  public bvn='';
  token='';
  user:any;
  error='';

  constructor(public navCtrl: NavController, public navParams: NavParams,public restProvider: RestProvider,public formBuilder: FormBuilder,private storage: Storage) {
    this.authForm = formBuilder.group({
      bvn: ['', Validators.compose([Validators.required, Validators.minLength(11),Validators.maxLength(11)])]
    });

    this.storage.get("token").then(data=>{
      this.token=data;
      this.storage.get("user").then(data=>{
        this.user=data;
        this.checkBvn();
      });
      
    });    
  }

  //check if bvn had been saved
  checkBvn(){
    this.restProvider.checkBvn(this.token).then(data=>{
        let resp=JSON.parse(JSON.stringify(data));
        if(resp.success){
          this.navCtrl.push(HomePage);
        }
        else{

        }
    });
  }


  pay(){
    let my=this;

    this.restProvider.checkBvnPayment(this.token).then(data=>{
      let resp=JSON.parse(JSON.stringify(data));
      if(resp.success){
        //bvn is saved meaning payment was made earlier 
        //go ahead and get bvn
        my.getBvn();
      }
      else{

        //payment was not made so you need to pay

        my.payWithPaystack(100);
      }
  });
    
  }

  //now lets makethe payment actually

  payWithPaystack(amount){
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

          my.restProvider.makeBvnPayment(my.token,realAmount,authcode).then(res=>{
              let resp2=JSON.parse(JSON.stringify(res));
              if(resp2.success){

                //after saving payment get the person bvn
                my.getBvn();
              }
              else{
                my.error='payment did not save successfully';
              }
          });
          
        });
         
          
      },
      onClose: function(){
          alert('Payment canceled');
      }
    })
    handler.openIframe();
  }

  wipeError(){
    this.error='';
  }


  //get the persons bvn

  getBvn(){
    this.restProvider.getBvn(this.token,this.bvn)
    .then(data => {
      var result=JSON.parse(JSON.stringify(data));
      if(result.success){
        this.navCtrl.push(HomePage);
      }
      else{
        this.error=result.error;
      }
    });
  }


  //check if payment was made before getting bvn
  onSubmit(){ 
    this.pay();
  }


  ionViewDidLoad() {
    
  }

}
