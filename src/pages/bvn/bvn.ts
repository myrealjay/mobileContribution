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


  wipeError(){
    this.error='';
  }



  //check if payment was made before getting bvn
  onSubmit(){ 
    this.restProvider.getBvn(this.token,this.bvn)
    .then(data => {
      var result=JSON.parse(JSON.stringify(data));
      if(result.success){
        this.restProvider.showToast('Your bvn was successfully verified');
        this.navCtrl.push(HomePage);
      }
      else{
        this.error=result.error;
      }
    });
  }


  ionViewDidLoad() {
    
  }

}
