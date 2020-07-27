import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})

export class GalleryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
   
    
    this.getgallarylinks();

 
  }


  linkobject:any;
  links:  Array<any> = [];
  linkobjectsize;
  async getgallarylinks(){
  await firebase.firestore().collection("gallary").doc("gallary").get().then((document)=>{
    this.linkobject=document.data();
    this.linkobjectsize=document.data().gsize;
    console.log(this.linkobject);
    console.log(this.linkobjectsize);
  
  }).catch((err)=>{
    console.log("Error occured"+err);
  });
 

  for(let i=1;i<=this.linkobjectsize;i++){
   let v=this.linkobject["g"+i];
   if(v!=null){
    this.links.push(v);
   }
    
    
   
  }
}


}
