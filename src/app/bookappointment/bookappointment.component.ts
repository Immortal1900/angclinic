import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbCalendar, NgbDate,} from '@ng-bootstrap/ng-bootstrap';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { equal } from 'assert';
declare var $: any;


@Component({
  selector: 'app-bookappointment',
  templateUrl: './bookappointment.component.html',
  styleUrls: ['./bookappointment.component.css']
}) 
export class BookappointmentComponent implements OnInit {
  appointmentform:FormGroup;
  emailPattern="(^$|^.*@.*\..*$)";
  phnopattern="[0-9]{10}";
  emailempty:boolean=true;
  _model: NgbDate;
  date: {year: number, month: number};
  dateselected:boolean=false;
  timeselected:boolean=false;
  checkavailabilty:boolean=true;
  selecteddatestring;
  selecteddatestringwithoutslash;
  
  weekDays = {
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Satarday',
    7: 'Sunday'
  }
  selectedDay: string = '';
  set model(val) {
    this._model = val;
    this.selectedDay = this.weekDays[this.calendar.getWeekday(this.model)]
  }

  get model() {
    return this._model;
  }
 

 
  selectedate;

  time;

  settime(t:String){
   
    this.time=t;
    this.timeselected=true;
    console.log(this.time);
   
  }
  onDateSelect(asd){
    this.selectedate=this.model.day;
    this.dateselected=true;
    console.log(this.selectedate);
    console.log("Date seleted");
  }
  constructor(private calendar: NgbCalendar,public fb: FormBuilder) {
    this.appointmentform = this.fb.group({
      name: ['', [Validators.required]], 
      email: ['',[Validators.pattern(this.emailPattern)]],
      phno:['', [Validators.required, Validators.pattern(this.phnopattern)]],
      msg: [''],
      subject:[''], 
      confirmphno: ['', [Validators.required]]
        },
        {
          validator: this.checkIfMatchingPasswords("phno", "confirmphno"),
          
        }         
      )
   }
   checkifemailempty(appointmentform){
    let emailempty: string = appointmentform.value.email;
     if(emailempty==""){
       return true;
     }
     else{
       return false
     }
   
   }
   checkifsubempty(appointmentform){
    let subempty: string = appointmentform.value.subject;
     if(subempty==""){
       return true;
     }
     else{
       return false
     }
   
   }
   checkIfMatchingPasswords(passwordKey: string, confirmPasswordKey: string){
    return (group: FormGroup) => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if(password.value == confirmPassword.value){
        return;
      } else {
        confirmPassword.setErrors({
          notEqualToPassword: true
        })
      }

    }
  }
  closedday;i;
  closeddate;
  closeddatesize;
  closed:boolean=false;
  closedmsg:String="";
  checkavailablilticlicked:boolean=false;
  async checkclosed(){
    this.closed=false;
    this.checkavailablilticlicked=true;
    //check the date if it is closed or not
    //create a date string with selectdate
    this.selecteddatestring=this.selectedate.toString() +"/" +this.date.month.toString()+"/"+this.date.year.toString();
    this.selecteddatestringwithoutslash=this.selectedate.toString()  +this.date.month.toString()+this.date.year.toString();
    console.log(this.selecteddatestring);
    console.log(this.selecteddatestringwithoutslash);
    console.log("started");
    await firebase.firestore().collection('closeddate').doc(this.selecteddatestringwithoutslash).get().then((ds)=>{
      if (ds.exists) {
        console.log(ds.data.length);
      this.closedday=ds.data();
      this.closed=true;
      this.closedmsg=this.closedday.closedmsg;
      console.log(this.closedday.closedmsg);
      console.log("Document data:", this.closedday.closedmsg); 
            } else {
                      console.log("No such document!");
    }
      
    }).catch((ee)=>{"ERROR"+ee})

       //check the selectedday if it is closed or not
   await firebase.firestore().collection("closedday").doc("closedday").get().then((document)=>{
    this.closedday=document.data();
    console.log(this.closedday.day);
  }).catch((err)=>{
    console.log("Error occured"+err);
  });
  if(this.selectedDay==this.closedday.day){
    this.closed=true;
    this.closedmsg="We are closed on Sunday"
    console.log("We are CLosed on Sunday ");
  }
  if(this.closed==false){
    this.closedmsg="Available";
  }
  
 
  }
  onSubmit(appointmentform){
    console.log('Form Submitted');
    let email: string = appointmentform.value.email;
    let name: string = appointmentform.value.name;
    let phno: string = appointmentform.value.phno;
    let msg: string = appointmentform.value.msg;
    let subject: string=appointmentform.value.subject;

    console.log(email,name,phno,msg);
    
  
    firebase.firestore().collection("bookappointment").doc().set({
      name:appointmentform.value.name,
      phno:appointmentform.value.phno,
      email:appointmentform.value.email,
      msg:appointmentform.value.msg,
      subject:appointmentform.value.subject,
      appointmentdate:this.selecteddatestring,
      appointmenttime:this.time
    }).then(()=>{
      
      
      console.log("Sent");
      
      $('.toast').toast('show');


    }).catch((err)=>{console.log("err")});
     appointmentform.reset();
    
  }
 

    
  
  
  
  ngOnInit(): void {
  }

}
