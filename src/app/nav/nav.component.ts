import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery';
import { CookieService } from 'angular2-cookie/services/cookies.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  deff="/assets/images/user.jpg";
  refreshme = function() {
    location.reload();
  }
  @Input() data;
  containerCase=false;
  joiner = function() {
    let scroller = Number (sessionStorage.getItem("getiinPos"))
    window.scrollTo({top: scroller, left: 0, behavior: 'smooth' });
  }
  logouter = function() {
    this._cookieService.remove('ZLS')
    this._cookieService.remove('ZLX')
    this._cookieService.remove('ZLO')
    location.reload();
  }
  zuser='';
  searchWord='';
  zpho='';
  loggedinzl = false;
  zurl='http://zyadyasser.com/api/'
  goDown = function() {
    window.scrollTo({top: 5000, left: 0, behavior: 'smooth' });
  }
  constructor(private _cookieService : CookieService) { }

  ngOnInit() {
    this.searchWord = this.data
    if(sessionStorage.getItem("containerCase")=="yes"){
      this.containerCase=true;
    }else{
      this.containerCase=false;
    }
    if(this._cookieService.get('ZLS') && this._cookieService.get('ZLX')) {
      this.loggedinzl = true;
      this.zuser = this._cookieService.get('ZLX');
      this.zpho = this.zurl+ this._cookieService.get('ZLO');
      this.loggedinzl = true;
    }else {
      this.loggedinzl = false;
    }
    $(".nav-item").hover(function(){
      $(this).children('.line-nav').addClass("line-nav-ov")
    },
    function(){
      $(this).children('.line-nav').removeClass("line-nav-ov")
    })
  }
}
