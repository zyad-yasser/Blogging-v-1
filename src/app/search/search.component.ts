import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searcher:String
    blogs=[];
    blogsShow=[];
    search=[];
    zuser='';
    zid='';
    zpho='';
    loggedinzl = false;
    zurl='http://zyadyasser.com/api/'
    file='';
    blog = {
      caption:'',
      photo:'',
      body:'',
      cat:'',
      date:new Date().getDate()+"/"+new Date().getMonth()+"/"+new Date().getFullYear(),
      thumbs:0
    }
    searchFunc = function() {
      for (let i=0;i<=this.blogs.length;i++) {
        let finder = this.blogs[i].blog_body.search(this.searcher);
        if(finder !== -1){
          this.search.push(this.blogs[i])
        }
      }
    }
    cats = function(arg){
          if(arg=="Gaming"){return "bg-danger"}
          else if (arg=="technology"){return "bg-success"}
          else if (arg=="technology"){return "bg-success"}
          else if (arg=="development"){return "bg-warning"}
          else if (arg=="cars"){return "bg-info"}
          else {return "bg-dark"}
    }
    getBlogs = function() {
      let geturl = 'http://zyadyasser.com/api/blogs'
      this.http.get(geturl).subscribe((data:any)=>{
      if(data.msg !=="fail"){
      this.blogs=(data) 
      console.log(this.blogs)
      for (let i=0;i<=this.blogs.length;i++) {
        let finder = this.blogs[i].blog_body.search(this.searcher);
        if(finder !== -1){
          this.search.push(this.blogs[i])
        }
      }
      }
    });

    }
    
    addBlog = function() {
      this.hideBlogform = true;
      this.loading=true
      this.addBlogImg();
    }
  
    addBlogImg = function() {
      if (this.file =='') {
        let uploadUrl= 'http://zyadyasser.com/api/blognophoto'
          this.http.post(uploadUrl,{"z":"z"}).subscribe((data:any)=>{
          if(data.msg=="SUCCESS"){
          this.photo = ''
          this.token =  data.token
          this.addBlogData();
          };
          });
      } else {
      let uploadUrl= 'http://zyadyasser.com/api/blogaddphoto'
      // Begin upload photo process before adding user
      const fd:any = new FormData();
      fd.append('file', this.file, this.file.name)
        this.http.post(uploadUrl, fd).subscribe((data:any)=>{
        if(data.msg=="SUCCESS"){
        this.photo =  data.photo
        this.token =  data.token
        this.addBlogData();
        };
        });
      };
    };
  
    addBlogData = function() {
    let newBlog = {  
      blogOwner:this.zid,
      blogName:this.blog.caption,
      blogBody:this.blog.body,
      blogCat:this.blog.cat,
      blogDate:this.blog.date,
      blogPhoto:this.photo,
      blogToken:this.token
    };
    let url = 'http://zyadyasser.com/api/blogadd'
      this.http.post(url, newBlog).subscribe((data:any)=>{
        if(data.msg=="SUCCESS"){
        $(document).ready(function(){
        $(".creator").html('<i class="fa fa-plus" aria-hidden="true"></i>');
        $(".composer").toggleClass("creating");
        });
        this.loading=false
        this.hideBlogform = false;
        this.blog.caption='';
        this.blog.body='';
        this.blog.cat='';
        this.photo='';
        this.token='';
        } else {
        this.loading=false
        this.hideBlogform = false;
        };
      });
    };
    existlike = function(arg) {
      for(let i=0; i<=arg.length; i++){
        if (arg[i] == this.zid ){
          return 1;
        }
    }
  }
    disliker = function(arg) {
      for(let i=0;i<this.blogsShow.length;i++){
        if (this.blogsShow[i]._id === arg ){
          if(this.blogsShow[i].blog_likes.length !==0){
          let disliked=false;
          for(let j=0;j<this.blogsShow[i].blog_likes.length;j++){
            if(this.blogsShow[i].blog_likes[j]===this.zid){
              this.blogsShow[i].blog_likes.pop(this.zid)
              let likeUrl= 'http://zyadyasser.com/api/like'
              this.http.post(likeUrl,{bloglikes:this.blogsShow[i].blog_likes,blog:arg}).subscribe((data:any)=>{
              });
            }
          }
        } else {
              this.blogsShow[i].blog_likes.push(this.zid)
              let likeUrl= 'http://zyadyasser.com/api/like'
              this.http.post(likeUrl,{bloglikes:this.blogsShow[i].blog_likes,blog:arg}).subscribe((data:any)=>{
              });
  
        }
        }
      }   
    }
   liker = function(arg) {
      for(let i=0;i<this.blogsShow.length;i++){
        if (this.blogsShow[i]._id === arg ){
          if(this.blogsShow[i].blog_likes.length !==0){
          let disliked=false;
          for(let j=0;j<this.blogsShow[i].blog_likes.length;j++){
            if(this.blogsShow[i].blog_likes[j]!==this.zid){
              this.blogsShow[i].blog_likes.push(this.zid)
              let likeUrl= 'http://zyadyasser.com/api/like'
              this.http.post(likeUrl,{bloglikes:this.blogsShow[i].blog_likes,blog:arg}).subscribe((data:any)=>{
              });
            }
          }
        } else {
              this.blogsShow[i].blog_likes.push(this.zid)
              let likeUrl= 'http://zyadyasser.com/api/like'
              this.http.post(likeUrl,{bloglikes:this.blogsShow[i].blog_likes,blog:arg}).subscribe((data:any)=>{
              });
  
        }
        }
      }   
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
    constructor(private http : HttpClient , private _cookieService : CookieService,private route: ActivatedRoute, private router: Router) { }
  
    ngOnInit() {
      this.searcher = this.route.snapshot.paramMap.get('id');
      this.getBlogs();
      sessionStorage.setItem("containerCase", "yes");
      if(this._cookieService.get('ZLS') && this._cookieService.get('ZLO') && this._cookieService.get('ZLX')) {
        this.loggedinzl = true;
        this.zuser = this._cookieService.get('ZLX');
        this.zid = this._cookieService.get('ZLS');
        this.zpho = this.zurl+ this._cookieService.get('ZLO');
        this.loggedinzl = true;
      }else {
        this.loggedinzl = false;
      }
      $(document).ready(function(){    
      this.open=0;
      let zoz = 0
      $(".blog-show").fadeIn("slow");
      $(".creator").click(function(){
        if(zoz == 0) {
          $(this).html('<i class="fa fa-minus" aria-hidden="true"></i>');
          zoz=1;
        } else {
          $(this).html('<i class="fa fa-plus" aria-hidden="true"></i>');
          zoz =0;
        }
      $(".composer").toggleClass("creating");
      $(".hiddenData").fadeToggle("fast",
      function() {
        $(".cont-hid").toggleClass("p-2");
      });
      });
      
      $(".refresh").hover(function(){
        $(".fa-refresh").addClass("rotating")
      },
      function(){
        $(".fa-refresh").removeClass("rotating")
      })
    })
    }
  
  }