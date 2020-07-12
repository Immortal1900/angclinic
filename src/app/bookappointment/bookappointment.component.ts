import { Component, OnInit } from '@angular/core';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-bookappointment',
  templateUrl: './bookappointment.component.html',
  styleUrls: ['./bookappointment.component.css']
})
export class BookappointmentComponent implements OnInit {
  model: NgbDateStruct;
  date: {year: number, month: number};
  selectToday() {
    this.model = this.calendar.getToday();
  }
  constructor(private calendar: NgbCalendar) { }

  ngOnInit(): void {
  }

}
