import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';



@Component({
  selector: 'page-newscheme',
  templateUrl: 'newscheme.html',
})
export class NewschemePage {
  token='';
  authForm: FormGroup;

  fullname='';
  amount:any;
  members:any;
  user:any;

  public error='';

  constructor(public navCtrl: NavController, public navParams: NavParams,public restProvider: RestProvider,private storage: Storage,
    public formBuilder: FormBuilder) {
      this.authForm = formBuilder.group({
        fullname: ['', Validators.compose([Validators.required])],
        amount: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]+')])],
        members: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]+')])]
        
      });

      this.storage.get("token").then(data=>{
        if(data){
          this.token=data;
          this.storage.get("user").then(data2=>{
            this.user=data2;
            this.checkauth(data);
          });
        }
      });
  }

  checkauth(token){
    this.restProvider.checkauth(token).then(data=>{
      let resp=JSON.parse(JSON.stringify(data));
      
      if(!resp.user){
        this.navCtrl.push(LoginPage);
      }
      
    });
  }

  wipeError(){
    this.error='';
  }

  

  onSubmit(){ 
      let my=this;

      this.restProvider.checkBvnPayment(this.token,this.fullname).then(data=>{
        let resp=JSON.parse(JSON.stringify(data));
        if(resp.success){
          //bvn is saved meaning payment was made earlier 
          //go ahead and create a scheme
          my.createScheme();
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

          my.restProvider.makeBvnPayment(my.token,realAmount,authcode,my.fullname).then(res=>{
              let resp2=JSON.parse(JSON.stringify(res));
              if(resp2.success){

                //after saving payment create the scheme
                my.createScheme();
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

  createScheme(){
    this.restProvider.newScheme(this.token,this.fullname,this.amount,this.members)
    .then(data => {
      var result=JSON.parse(JSON.stringify(data));
      
      if(result.error){
        this.error=result.error;
      }
      else{
        this.navCtrl.push(HomePage);
      }
      
    });
  }

  back(){
    this.navCtrl.push(HomePage);
  }

  
  ionViewDidLoad() {
    
  }

}
