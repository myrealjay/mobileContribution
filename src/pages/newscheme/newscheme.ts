import { Component } from '@angular/core';
import { NavController, NavParams ,ModalController } from 'ionic-angular';
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
  selectedDate:any;

  startDate:any;
  endDate:any;

  daysToEat:any;

  payDay='';
  payDayStr='';

  public error='';
  error2:any;

  //eating days and indexes
  eatingDays={};
  indexes=[];

  
  constructor(public navCtrl: NavController, public navParams: NavParams,public restProvider: RestProvider,private storage: Storage,
    public formBuilder: FormBuilder,public modalCtrl: ModalController) {
      this.authForm = formBuilder.group({
        fullname: ['', Validators.compose([Validators.required])],
        startDate: ['', Validators.compose([Validators.required])],
        endDate: ['', Validators.compose([Validators.required])],
        amount: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]+')])],
        members: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]+'),Validators.min(5)])],
        payDay: ['']
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
        this.restProvider.showToast('Your session has expired');
        this.navCtrl.push(LoginPage);
      }
      
    });
  }

  wipeError(){
    this.error='';
  }

  parseDate(str) {
    var mdy = str.split('-');
    return new Date(mdy[0], mdy[1]-1, mdy[2]);
  }

  datediff(first, second) {
      // Take the difference between the dates and divide by milliseconds per day.
      // Round to nearest whole number to deal with DST.
      return Math.round((second-first)/(1000*60*60*24));
  }

  getDate(date,int){
    let mydate=new Date(date);
    mydate.setDate(mydate.getDate()+int);
    return mydate;
  }

  formatDate(date) {
    var months = [
      "01", "02", "03",
      "04", "05", "06", "07",
      "08", "09", "10",
      "11", "12"
    ];
  
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
  
    return day + '-' + months[monthIndex] + '-' + year;
  }

  changePayDay(){
    this.payDayStr=this.eatingDays[this.payDay];
  }

  SumitForm(){
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


  onSubmit(){ 
    
    this.error2='';
    this.error='';

    //check if scheme already exist
     this.restProvider.checkAvailibity(this.token,this.fullname).then(data=>{
      let resp=JSON.parse(JSON.stringify(data));
      if(resp.error){
        this.error2=resp.error;
      }
      else{

        //check if start date is greater than 30 days
          let curdate=new Date();
          curdate.setDate(curdate.getDate()+29);
          let selStart=new Date(this.startDate);

          if(selStart>curdate){
              this.error2='Scheme must start in less than 31 days';
          }
          else{

              //scheme doesnot exist go ahead and create it
              let days=this.datediff(this.parseDate(this.startDate), this.parseDate(this.endDate));

              if(!(this.members <= days)){
                this.error2='Interval must be greater than or eqaul to number of members';
              }
              else{
                let int=days/this.members;
                  let daysInterval=parseInt(int.toString());
                  this.daysToEat=daysInterval;
                  let curdate=this.startDate;
                  for(let i=1;i<=this.members;i++){
                    let newdate=this.getDate(curdate,daysInterval);
                    let formarted=this.formatDate(newdate);
                    curdate=newdate;
                    //add the date in the array
                    this.eatingDays[i]=formarted;
                    this.indexes.push(i);
                  }

                  this.payDay=this.indexes[0];
                  this.payDayStr=this.eatingDays[this.payDay];
              }
            
          }
          
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
        this.restProvider.showToast('Your payment was canceled');
      }
    })
    handler.openIframe();
  }

  createScheme(){
    let startDate=new Date(this.startDate);
    let endDate=new Date(this.endDate);
    let forStart=this.formatDate(startDate);
    let forEnd=this.formatDate(endDate);
    this.restProvider.newScheme(this.token,this.fullname,this.amount,this.members,forStart,forEnd,this.eatingDays,this.payDayStr)
    .then(data => {
      var result=JSON.parse(JSON.stringify(data));

      if(result.data){
        this.restProvider.showToast('Your scheme was created successfully');
        this.navCtrl.push(HomePage);
      }
      else if(result.error){
        this.error=result.error;
      }
      else if(JSON.parse(result).Name){
        let errname=JSON.parse(result).Name;
        this.error2=errname[0];
      }
      
    });
  }


  back(){
    this.navCtrl.push(HomePage);
  }

  
  ionViewDidLoad() {
    
  }

}
