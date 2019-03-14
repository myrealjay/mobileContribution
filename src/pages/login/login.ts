import { Component } from '@angular/core';
import { NavController, NavParams,MenuController ,Platform  } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
import { VerifyPage } from '../verify/verify';
import { BvnPage } from '../bvn/bvn';


declare var SMS:any;
declare var cordova: any;

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  authForm: FormGroup;
  public username='';
  public password='';
  error='';
  uuid:any;

  permissions:any;//cordova.plugins.permissions;
  messages:any;

  constructor(public restProvider: RestProvider,public navCtrl: NavController, public navParams: NavParams,public menuCtrl: MenuController,
    public platform:Platform,public formBuilder: FormBuilder,private storage: Storage
    ) 
    {

      this.authForm = formBuilder.group({
        username: ['', Validators.compose([Validators.required])],
        password: ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      });

      this.storage.get("token").then(data=>{
        if(data){
          this.checkauth(data);
        }
      });

      
    }

  checkauth(token){
    this.restProvider.checkauth(token).then(data=>{
      let resp=JSON.parse(JSON.stringify(data));
      
      if(resp.user){
        this.navCtrl.push(HomePage);
      }
      
    });
  }

  ionViewWillEnter(){
   /* let my=this;
    this.platform.ready().then((readySource) => {
      if(this.platform.is('cordova')){
        
        (<any>window).window.plugins.uniqueDeviceID.get(success, fail);
        
        this.permissions=cordova.plugins.permissions;
        this.checkPermission();
      }

      function success(uuid)
          {
              my.uuid=uuid;
          };
        function fail(err){
          console.log(err);
        }
    });*/
  }

  wipeError(){
    this.error='';
  }


  ionViewDidLoad() {
    this.menuCtrl.enable(false, 'myMenu');
  }

  ionViewDidLeave(){
    this.menuCtrl.enable(true, 'myMenu');
  }

  /*getGroupName(text){
    
    let patt = /\?.+/i;
    let result = text.match(patt);

    let name=result[0].split("=");
    let groupname=name[1];
    this.username=groupname;
  }*/

     /* checkPermission()
      {
        let my=this;
          this.permissions.hasPermission(this.permissions.READ_SMS, function( status ){
            if ( status.hasPermission ) {
              console.log("Yes :D ");
              my.ReadSMSList();
            }
            else {
              console.warn("No :( ");
              my.requestperm();
            }
          });

      }*/

/*
      requestperm(){
        let my=this;
        this.permissions.requestPermission(this.permissions.READ_SMS, success, error);
 
        function error() {
          console.warn('SMS permission is not turned on');
        }
        
        function success( status ) {
          if( !status.hasPermission ) {
            error();
          }else{
            my.ReadSMSList();
          }
        }
      }
      
    ReadSMSList()
    { 
      let my=this;
        this.platform.ready().then((readySource) => {
            
        let filter = {
        box : 'inbox', // 'inbox' (default), 'sent', 'draft'
        indexFrom : 0, // start from index 0
        maxCount : 1, // count of SMS to return each time
        address: '+2348132780640',
        };
            
        if(SMS){
          console.log(SMS);
          SMS.listSMS(filter, (ListSms)=>{   
            console.log(ListSms);            
            my.messages=ListSms;
            my.getGroupName(ListSms[0].body);
           
          },    
          Error=>{
            alert(JSON.stringify(Error));
            console.log(Error);
          }); 
        }
        else{
          console.log("sms not found");
        }
               
        });
    }*/

    register(){
      this.navCtrl.push(RegisterPage);
    }


    onSubmit(){ 
      this.restProvider.login(this.username,this.password)
      .then(data => {
        var result=JSON.parse(JSON.stringify(data));
        if(result.token){
          this.storage.set("token",result.token);
        }
        
        if(!result.error){
          this.storage.set("token",result.token);
          this.restProvider.checkauth(result.token).then(data2=>{
            let resp=JSON.parse(JSON.stringify(data2));
            
            if(resp.user){
              this.storage.set("token",result.token);
              this.storage.set("user",resp.user);
              this.navCtrl.push(BvnPage);
            }
          });
        }
        else{
          if(result.error){
            this.error=result.error;
            if(result.error=="user not confirmed"){
              this.navCtrl.push(VerifyPage);
            }
          }
          
        }
        
      });
    }




}
