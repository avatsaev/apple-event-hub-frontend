import {Component, OnInit, ElementRef} from '@angular/core';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-countdown',
  template: `
    <div class="container">
        
      <div class="row countdown">
        <div class="col s3">
          <span class="digit z-depth-2">
          
            {{remaining_time.days}}
          </span>
        </div>
        <div class="col s3">
          <span class="digit z-depth-2">
            {{remaining_time.hours}}
          
          </span>
        </div>
        <div class="col s3">
          <span class="digit z-depth-2">
            {{remaining_time.minutes}}
          
          </span>
        </div>
        <div class="col s3">
          <span class="digit z-depth-2">
          
            {{remaining_time.seconds}}
          </span>
        </div>
      </div>
      <div class="row legend">
        <div class="col s3">
          DAYS
        </div>
        <div class="col s3">
          HOURS
        </div>
        <div class="col s3">
          MINS
        </div>
        <div class="col s3">
          SECS
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./countdown.component.sass']
})
export class CountdownComponent implements OnInit {

  private future:Date;
  private futureString:string;
  private diff:number;

  remaining_time:Object;

  constructor(elm: ElementRef) {
    this.futureString = elm.nativeElement.getAttribute('inputDate');
  }

  dhms(t){
    var days, hours, minutes, seconds;
    days = Math.floor(t / 86400);
    t -= days * 86400;
    hours = Math.floor(t / 3600) % 24;
    t -= hours * 3600;
    minutes = Math.floor(t / 60) % 60;
    t -= minutes * 60;
    seconds = t % 60;


    this.remaining_time = {
      days,
      hours,
      minutes,
      seconds
    }

  }


  ngOnInit() {

    this.remaining_time = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };

    this.future = new Date(this.futureString);

    Observable.interval(1000).map((x) => {
      this.diff = Math.floor((this.future.getTime() - new Date().getTime()) / 1000);
    }).subscribe((x) => {
      this.dhms(this.diff);
    });
  }

}
