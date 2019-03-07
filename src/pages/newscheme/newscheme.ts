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
          this.checkauth(data);
          this.token=data;
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
    console.log('ionViewDidLoad NewschemePage');
  }

}
