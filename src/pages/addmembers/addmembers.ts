import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-addmembers',
  templateUrl: 'addmembers.html',
})
export class AddmembersPage {
  public form 	: FormGroup;

  id=0;
  members=0;
  scheme='';
  amount=0;

  name=[];
  email=[];
  phone=[];

  token='';

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _FB : FormBuilder,public restProvider: RestProvider,private storage: Storage) {
    this.id=this.navParams.get("id");
    this.members=this.navParams.get("members");
    this.amount=this.navParams.get("amount");
    this.scheme=this.navParams.get("name");
    this.storage.get("token").then(data=>{
      if(data){
        this.checkauth(data);
        this.token=data;
        
      }
    });
    this.form = this._FB.group({
      data  : this._FB.array([
         this.initData()
      ])
   });
   this.populate();
  }

  checkauth(token){
    this.restProvider.checkauth(token).then(data=>{
      let resp=JSON.parse(JSON.stringify(data));
      
      if(!resp.user){
        this.navCtrl.push(LoginPage);
      }
      
    });
  }

  populate(){
    for(let i=0;i<this.members-2;i++){
      this.addNewInputField();
    }
  }

  initData() : FormGroup
  {
    return this._FB.group({
        name : ['', Validators.required],
        email: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9\.]+@[a-zA-Z0-9\.]+[\.][a-zA-Z0-9\.]+'), Validators.minLength(5), Validators.maxLength(100)])],
        phone : ['', Validators.required]
    });
  }

  addNewInputField() : void
  {
    const control = <FormArray>this.form.controls.data;
    control.push(this.initData());
  }

    manage(val : any) : void
   {
      val.data.forEach(element => {
        this.name.push(element.name);
        this.email.push(element.email);
        this.phone.push(element.phone);
        
      });
      this.restProvider.Regmembers(this.token,this.scheme,this.name,this.email,this.phone,this.amount).then(data=>{
        let resp=JSON.parse(JSON.stringify(data));
        if(resp.message){
          this.navCtrl.push(HomePage);
        }
      });
      console.log(this.name,this.email,this.scheme,this.amount);
   }

   back(){
    this.navCtrl.push(HomePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddmembersPage');
  }

}
