import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-headerandfooter',
  templateUrl: './headerandfooter.component.html',
  styleUrls: ['./headerandfooter.component.css']
})
export class HeaderandfooterComponent implements OnInit {
  public isMenuCollapsed = true;
  constructor() { }

  ngOnInit(): void {
  }

}
