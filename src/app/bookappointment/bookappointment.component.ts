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
  model: NgbDateStruct;
  date: {year: number, month: number};
  dateselected:boolean=false;
  timeselected:boolean=false;
  checkavailabilty:boolean=true;
  selecteddatestring;
  
  
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



  constructor(private calendar: NgbCalendar,public fb: FormBuilder) {
    this.appointmentform = this.fb.group({
      name: ['', [Validators.required]], 
      email: ['',[Validators.pattern(this.emailPattern)]],
      phno:['', [Validators.required, Validators.pattern(this.phnopattern)]],
      dates:[''],
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


  onSubmit(appointmentform){
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
   
    
  }
 

    
  
  
  
  ngOnInit(): void {
  }

}
