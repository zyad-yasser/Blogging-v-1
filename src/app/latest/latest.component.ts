import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Component({
  selector: 'app-latest',
  templateUrl: './latest.component.html',
  styleUrls: ['./latest.component.css']
})
export class LatestComponent implements OnInit {
  zurl='http://zyadyasser.com/api/'
  cats = function(arg){
    if(arg=="Gaming"){return "bg-danger"}
    else if (arg=="technology"){return "bg-success"}
    else if (arg=="development"){return "bg-warning"}
    else if (arg=="cars"){return "bg-info"}
    else {return "bg-dark"}
}
getBlogs = function() {
let geturl = 'http://zyadyasser.com/api/blogs'
this.http.get(geturl).subscribe((data:any)=>{
if(data.msg !=="fail"){
this.blogs = data 
this.blogsShow = this.blogs.slice(this.blogs.length-3 , this.blogs.length)
for(let i=0; i<this.blogsShow.length;i++) {
  let userid=this.blogsShow[i].blog_owner
  let geturl = 'http://zyadyasser.com/api/user/'+userid
  this.http.get(geturl).subscribe((data:any)=>{
    this.blogsShow[i].username=data.username
  });
}
console.log(this.blogsShow)
}
});

}
blogs=[];
blogsShow=[];
zuser='';

  constructor(private http : HttpClient) { }

  ngOnInit() {
    this.getBlogs();
    $(document).ready(function(){
    $(".latest-panel").hover(function() {
      $(this).find(".increaser").animate({ width : "150%" },500);
      $(this).find(".arrow").addClass("arrow-load");
      $(this).find(".latest-info").animate({ bottom : "10px" },500);
      $(this).find(".latest-icons").fadeIn("slow");
    },
    function(){
      $(this).find(".increaser").animate({ width : "120%" },500);
      $(this).find(".arrow").removeClass("arrow-load") 
      $(this).find(".latest-info").animate({ bottom : "-100px" },500);
      $(this).find(".latest-icons").fadeOut("slow");
  });
  });
  }
}
