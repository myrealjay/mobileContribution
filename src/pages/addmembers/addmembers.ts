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
  paydays:any;
  payday='';

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
      ]),
      payday: ['', Validators.required]
   });
   this.populate();
  }

  checkauth(token){
    this.restProvider.checkauth(token).then(data=>{
      let resp=JSON.parse(JSON.stringify(data));
      
      if(!resp.user){
        this.navCtrl.push(LoginPage);
      }
      else{
        this.getPayDays();
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
      this.restProvider.Regmembers(this.token,this.scheme,this.name,this.email,this.phone,this.amount,this.payday).then(data=>{
        let resp=JSON.parse(JSON.stringify(data));
        if(resp.message){
          this.navCtrl.push(HomePage);
        }
      });
    
   }

   back(){
    this.navCtrl.push(HomePage);
  }


  getPayDays(){
    this.restProvider.payDays(this.token,this.members,this.scheme).then(data=>{
      let resp=JSON.parse(JSON.stringify(data)).paydays;
      this.paydays=resp;
      this.payday=this.paydays[0];
      
    });
  }

  handlechange(){
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddmembersPage');
  }

}
