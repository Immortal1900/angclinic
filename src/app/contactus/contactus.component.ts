import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

declare var $: any;

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
 // emailPattern = "^$|^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
 emailPattern="(^$|^.*@.*\..*$)";
  phnopattern="[0-9]{10}";
  contactform:FormGroup;
  allvalid:boolean;

  constructor(public fb: FormBuilder) {

    this.contactform = this.fb.group({
      name: ['', [Validators.required]], 
      email: ['',[Validators.pattern(this.emailPattern)]],
      phno:['', [Validators.required, Validators.pattern(this.phnopattern)]],
      msg: ['', [Validators.required]], 
     
        })
  
  
  }
  onSubmit(contactform){
    let email: string = contactform.value.email;
    let name: string = contactform.value.name;
    let phno: string = contactform.value.phno;
    let msg: string = contactform.value.msg;
    console.log(email,name,phno,msg);
    $('.toast').toast('show');
    let r = Math.random().toString(36).substring(2,9);
    console.log("random", r);
    firebase.firestore().collection("Contactus").doc(r).set({
      name:contactform.value.name,
      phno:contactform.value.phno,
      email:contactform.value.email,
      msg:contactform.value.msg,
    }).then(()=>{
      
      
      console.log("Sent")


    }).catch((err)=>{console.log("err")});
     contactform.reset();
    
  }

  
  ngOnInit(): void {
  }
 


}
