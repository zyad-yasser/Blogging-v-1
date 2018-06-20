import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(window).scroll(function (event) {
      var p1 = document.getElementById("p1");
      var p2 = document.getElementById("p2");
      var p3 = document.getElementById("p3");
      var myArr = []; myArr.push(p1,p2,p3)
      for(let i=0;i<myArr.length;i++){
        var scroll = $(window).scrollTop();
        var position = myArr[i].offsetTop-500
        if(scroll>=(position)) {
          myArr[i].classList.add("shower");

        }
      } 
  });
  $(".panel").hover(function () {
    $(this).addClass("panel-hover");
  },
  function () {
    $(this).removeClass("panel-hover");
  });

  }
}
