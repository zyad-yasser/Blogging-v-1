import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    zuser='';
    zpho='';
    loggedinzl = false;
    zurl='http://zyadyasser.com/api/'
  
    blog = {
      caption:'',
      photo:'',
      body:'',
      cat:'',
      date:new Date,
      thumbs:0
    }
    
    changePhoto = function() {
      let inputer1 : any = document.querySelector('#inputer1');
      inputer1.click();
    }
    blogImg = function(event) {
        $(".picBlog").fadeOut("fast");
        this.file = event.target.files[0];
        let reader = new FileReader();
        let inputer1 : any =  document.querySelector('#inputer1')
        let imgPreview1 : any = document.querySelector('#imgPreview1')
        reader.onload = function(e:any){
        imgPreview1.src = e.target.result;
        }
        reader.readAsDataURL(inputer1.files[0]);
    }
    selectNone=false;
    selectValidate = function(){
      if(this.blog.cat===''){
        this.selectNone=false;
      }else {
        this.selectNone=true;
      }
    }
    constructor(private _cookieService : CookieService) { }
  
    ngOnInit() {
      sessionStorage.setItem("containerCase", "yes");
      if(this._cookieService.get('ZLS') && this._cookieService.get('ZLO') && this._cookieService.get('ZLX')) {
        this.loggedinzl = true;
        this.zuser = this._cookieService.get('ZLX');
        this.zpho = this.zurl+ this._cookieService.get('ZLO');
        this.loggedinzl = true;
      }else {
        this.loggedinzl = false;
      }
      $(".blog-show").fadeIn("slow");
      $(".creator").click(function(){
        console.log("clicked");
        $(".hiddenData").fadeIn("slow");
        $(".composer").addClass("creating");
        $(".cont-hid").addClass("p-2");
      });
      
      $(".refresh").hover(function(){
        $(".fa-refresh").addClass("rotating")
      },
      function(){
        $(".fa-refresh").removeClass("rotating")
      })
    }
  
  }
  