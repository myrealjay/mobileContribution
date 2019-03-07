import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AddmembersPage } from '../addmembers/addmembers';
import { RestProvider } from '../../providers/rest/rest';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';


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

  constructor(public navCtrl: NavController, public navParams: NavParams,public restProvider: RestProvider,private storage: Storage) {
    this.scheme=this.navParams.get('scheme');
    this.name=this.scheme.Name;
    
    this.storage.get("token").then(data=>{
      if(data){
        this.token=data;
        this.checkauth(data);
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
    console.log(this.scheme);
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
    });
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatedschemePage');
  }

}
