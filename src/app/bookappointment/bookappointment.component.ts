import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateStruct,} from '@ng-bootstrap/ng-bootstrap';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

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
  //model: NgbDateStruct;
  date: {year: number, month: number};
  dateselected:boolean=false;
  timeselected:boolean=false;
  checkavailabilty:boolean=true;
  selecteddatestring;
  model: NgbDate;
  
  
  weekDays = {
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Satarday',
    7: 'Sunday'
  }
 
  selectedate;
  selectedDay

  



  constructor(private calendar: NgbCalendar,public fb: FormBuilder) {
    this.appointmentform = this.fb.group({
      name: ['', [Validators.required]], 
      email: ['',[Validators.pattern(this.emailPattern)]],
      phno:['', [Validators.required, Validators.pattern(this.phnopattern)]],
      dates:[''],
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
  selecteddatestringwithoutslash;
  async checkclosed(){

    this.selectedDay = this.weekDays[this.calendar.getWeekday(this.model)];
    this.closed=false;
    this.checkavailablilticlicked=true;
    //check the date if it is closed or not
    //create a date string with selectdate
    this.selecteddatestring=this.model.day.toString()+"/" +this.model.month.toString()+"/"+this.model.year.toString();
    this.selecteddatestringwithoutslash=this.model.day.toString()  +this.model.month.toString()+this.model.year.toString();
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

  async onSubmit(appointmentform){
  await this.checkclosed();
if(this.closed==true){
  console.log("CLOSED");
}


else{ 
  if(confirm("Confirm Appointment on "+this.selecteddatestring)) {
    console.log("Implement delete functionality here");
    console.log(this.selectedDay);
    console.log('Form Submitted');
    this.selecteddatestring=this.model.day+"/"+this.model.month+"/"+this.model.year;
    let email: string = appointmentform.value.email;
    let name: string = appointmentform.value.name;
    let phno: string = appointmentform.value.phno;
  
    console.log(email,name,phno,this.selecteddatestring);
    
  
    firebase.firestore().collection("bookappointment").doc().set({
      name:appointmentform.value.name,
      phno:appointmentform.value.phno,
      email:appointmentform.value.email,
      appointmentdate:this.selecteddatestring,
    
    }).then(()=>{
      
      
      console.log("Sent");
      
      $('.toast').toast('show');
  
  
    }).catch((err)=>{console.log("err")});
     appointmentform.reset();
      this.closedmsg="";
    }
     
    }
  }
 

    
  
  
  
  ngOnInit(): void {
  }

}
