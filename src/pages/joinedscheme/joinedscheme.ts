import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';



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

  activelen=0;
 

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
    
    this.restProvider.join(this.token,this.name,this.user.name,this.user.email,this.user.phone,this.amount).then(data=>{
      let resp=JSON.parse(JSON.stringify(data));
      if(resp.message){
        this.navCtrl.push(HomePage);
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
     
      this.actives=resp;
      this.activelen=resp.length;
    });
  }


  back(){
    this.navCtrl.push(HomePage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad JoinedschemePage');
  }

}
