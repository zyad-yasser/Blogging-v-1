import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AddUserService } from '../add-user.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { CookieService } from 'angular2-cookie/services/cookies.service';

@Component({
  selector: 'app-getin',
  templateUrl: './getin.component.html',
  styleUrls: ['./getin.component.css']
})
export class GetinComponent implements OnInit {
  loggedinzl=false;
  zuser='';
  zid='';
  regEmail='';
  regName='';
  regUser='';
  regPass='';
  regPass1='';
  loginEmail='';
  loginPass='';
  msg='';
  hideRegform = false;
  hideloginform = false;
  loading=false;
  passRegMatch=false;
  userexist=false;
  regerror=false;
  loginerror=false;
  msgRegSuccess=false;
  file='';
  regDate=new Date().getDate()+"/"+new Date().getMonth()+"/"+new Date().getFullYear()
  token=''
  
  loginner = function() {
    let loginUrl= 'http://zyadyasser.com/api/login'
    this.hideloginform = true;
    this.loading=true
    let loginUser =  {
      loginEmail:this.loginEmail,
      loginPass:this.loginPass
    }
    this.http.post(loginUrl, loginUser).subscribe((data:any)=>{
      if(data.msg==="SUCCESS"){
      this._cookieService.put('ZLS',data.userid)
      this._cookieService.put('ZLO',data.userphoto)
      this._cookieService.put('ZLX',data.username)
      location.reload();
      }else if(data.msg==="fail"){
      $(document).ready(function(){
      $(".loginform").fadeIn("fast");
      $(".loginform").addClass("d-block");
      $(".loginform").addClass("loginformshow");
      $(".registerform").addClass("registerformhide");
      $(".registerform").removeClass("registerformshow");
      $(".registerform").hide();  
      })
      this.hideRegform = true;
      this.hideloginform = false;
      this.loginerror = true;
      this.loading = false;
      }
    });
  }

  addUser = function() {
    this.hideRegform = true;
    this.loading=true
    this.addUserImg();
  }

  addUserImg = function() {
    if (this.file =='') {
      this.token=''
      this.addUserData();
    } else {
    let uploadUrl= 'http://zyadyasser.com/api/useraddphoto'
    // Begin upload photo process before adding user
    const fd:any = new FormData();
    fd.append('file', this.file, this.file.name)
      this.http.post(uploadUrl, fd).subscribe((data:any)=>{
      if(data.msg=="SUCCESS"){
      this.token =  data.token
      this.addUserData();
      };
      });
    };
  };

  addUserData = function() {
  if (this.file ==''){this.token=''}
  let dater=this.regDate.toString()
  let newUser = {  
    regName:this.regName,
    regEmail:this.regEmail,
    regUser:this.regUser,
    regPass:this.regPass,
    regDate:dater,
    regToken:this.token
  };
  let url = 'http://zyadyasser.com/api/useradd'
    this.http.post(url, newUser).subscribe((data:any)=>{
      if(data.msg=="SUCCESS"){
      this.loading=false
      this.hideRegform = true;
      this.msgRegSuccess = true
      $(".loginform").fadeIn("fast");
      $(".loginform").addClass("loginformshow");
      $(".registerform").addClass("registerformhide");
      $(".registerform").removeClass("registerformshow");
      $(".registerform").hide();
      } else if (data.msg=="userexist") {
      this.loading=false
      this.hideRegform=false;
      this.userexist=true;
      } else {
      this.userexist=false;
      this.hideRegform = false;
      this.loading=false
      this.regerror=true;
      };
    });
  };

  checkRegPass = function() {
    if (this.regPass === this.regPass1) {
      this.passRegMatch = true;
    }else {
      this.passRegMatch = false;
    };
  };

  changePhoto = function() {
    let inputer : any = document.querySelector('#inputer');
    inputer.click();
  };

  displayPreview = function(event){
    $(".userIco").fadeOut("fast");
    this.file = event.target.files[0];
    let reader = new FileReader();
    let inputer : any =  document.querySelector('#inputer')
    let imgPreview : any = document.querySelector('#imgPreview')
    reader.onload = function(e:any){
    imgPreview.src = e.target.result;
    }
    reader.readAsDataURL(inputer.files[0]);
  }

  constructor(private http : HttpClient , private _cookieService : CookieService) { }

  ngOnInit() {
    if(this._cookieService.get('ZLS') && this._cookieService.get('ZLX')) {
      this.loggedinzl = true;
      this.zuser = this._cookieService.get('ZLX');
      this.zid = this._cookieService.get('ZLS');
      this.loggedinzl = true;
    }else {
      this.loggedinzl = false;
    }
    $(document).ready(function(){
    $(".loginshow").click(function(){
      $(".loginform").fadeIn("fast");
      $(".loginform").addClass("loginformshow");
      $(".registerform").addClass("registerformhide");
      $(".registerform").removeClass("registerformshow");
      $(".registerform").hide();
    });
    $(".registershow").click(function(){
      $(".registerform").fadeIn("fast");
      $(".registerform").addClass("registerformshow");
      $(".loginform").removeClass("loginformshow");
      $(".loginform").hide();
    });
  });
  window.onload = function () {
  let getting:any = document.getElementById("getin");
  let scroller = Number(getting.offsetTop);
  sessionStorage.setItem("getiinPos", ""+scroller+"");
  };
  };

}
