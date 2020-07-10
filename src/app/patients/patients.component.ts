import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

  aces=["appointment1","app2","app3","app3","app3"]
  constructor() { }

  ngOnInit(): void {
  }

}
