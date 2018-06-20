import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  uri='http://zyadyasser.com/api/'
  users=[];

  constructor(private http : HttpClient) { }

  ngOnInit() {
    let geturl = 'http://zyadyasser.com/api/getusers'
    this.http.get(geturl).subscribe((data:any)=>{
      if(data.msg !=="fail"){
        this.users = data 
        this.users = this.users.slice(this.users.length-4 , this.users.length)
      }
    });
    $(document).ready(function(){
    $(".blog-user").hover(function() {
      $(this).find(".footer-user-date").fadeIn("fast");
    },
    function(){
      $(this).find(".footer-user-date").fadeOut("fast");
  });
  });
  }

}
