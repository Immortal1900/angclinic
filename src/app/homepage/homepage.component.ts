import { ContactusComponent } from './../contactus/contactus.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbSlideEvent, NgbSlideEventSource, NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

declare var $: any;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  public isMenuCollapsed = true;
  iconlink="https://firebasestorage.googleapis.com/v0/b/sampletvf-8aa59.appspot.com/o/asdasdasdasds.JPG?alt=media&token=cd433367-98e1-46d5-89ab-a3423cd9de26";
  images = ['../../assets/dental1.png','../../assets/dental2.jpeg','../../assets/dental3.jpg','../../assets/dental5.jpg' ];
  personimage="https://image.shutterstock.com/image-photo/confident-smiling-doctor-posing-looking-600w-491761618.jpg";
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;

  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }
  imagelink:"https://firebasestorage.googleapis.com/v0/b/sampletvf-8aa59.appspot.com/o/mcdonalds-burger-fries-soda.jpg?alt=media&token=d9abb834-07c5-48b6-b53b-cc897bd7f442";
  
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
