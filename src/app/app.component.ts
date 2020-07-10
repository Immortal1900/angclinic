import { Component } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { rejects } from 'assert';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'angclinic';

  item ="dfhgdfhg";
 
  kk={
    name:"ASdasd",
  }
  doc:any={};
  lump:Observable<any[]>;
  nam:any;
  constructor(public firestore: AngularFirestore,  public angularFireDatabase: AngularFireDatabase){
    /*
    console.log("CONSTRUCTOR STARTED");
    //write to database
    this.firestore.collection("ORSER").doc("asd").set(this.kk).then(res=>{},err=>rejects(err));

   let data;
   let model ={name: ""};
   this.firestore.collection('ORSER').doc("asd").ref.get().then(function(doc) {
     if (doc.exists) {
         data = doc.data();
         model=data;
         console.log("Document data:", model.name); 
       
             } else {
         console.log("No such document!");
     }
   }).catch(function(error) {
       console.log("Error getting document:", error);
   });
   console.log("Service Data :: " + data); //second console
   var docRef = firestore.collection("ORSER").doc("asd");

docRef.get().subscribe(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
})*/

/*
firebase.firestore().collection("users").doc("asd").get().then((documentSnapshot) => {

  this.doc = documentSnapshot.data();

  console.log(this.doc);


}).catch((error) => {
  console.log(error);
})*/
}
}
