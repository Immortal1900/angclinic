import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbSlideEvent, NgbSlideEventSource, NgbCarousel } from '@ng-bootstrap/ng-bootstrap';

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
  constructor() { }

  ngOnInit(): void {
  }

}
