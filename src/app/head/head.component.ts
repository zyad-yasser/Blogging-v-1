import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {
  joiner = function() {
    let scroller = Number (sessionStorage.getItem("getiinPos"))
    window.scrollTo({top: scroller, left: 0, behavior: 'smooth' });
  }

  constructor() { 
  }

  ngOnInit() {

  }

}
