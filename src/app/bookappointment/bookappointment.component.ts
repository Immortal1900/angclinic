import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-bookappointment',
  templateUrl: './bookappointment.component.html',
  styleUrls: ['./bookappointment.component.css']
}) 
export class BookappointmentComponent implements OnInit {
  appointmentform:FormGroup;
  emailPattern="(^$|^.*@.*\..*$)";
  phnopattern="[0-9]{10}";
  model: NgbDateStruct;
  date: {year: number, month: number,};
  dateselected:boolean=false;
  timeselected:boolean=false;
  checkavailabilty:boolean=false;
  dateandtimeselected=this.dateselected && this.timeselected;
  selectToday() {
    this.model = this.calendar.getToday();
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
      msg: ['', [Validators.required]], 
      confirmphno: ['', [Validators.required]]
        },
        {
          validator: this.checkIfMatchingPasswords("phno", "confirmphno")
        })
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
 

    
  
  
  
  ngOnInit(): void {
  }

}
