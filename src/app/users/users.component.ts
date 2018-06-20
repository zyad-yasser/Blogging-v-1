import { Component, OnInit } from '@angular/core';
import { User } from '../models/user'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users:User[]=[
    {
      name:"zyad",
      password:"password",
      photo:"/assets/images/zyad.jpg",
      email:"zyadyasser6@gmail.com",  
      date: new Date ('1/5/1992') ,
      gender:"male"
    },{
      name:"zyad",
      password:"password",
      photo:"/assets/images/zyad.jpg",
      email:"zyadyasser6@gmail.com",  
      date:new Date ('1/5/1992'),
      gender:"male"
    },{
      name:"zyad",
      password:"password",
      photo:"/assets/images/zyad.jpg",
      email:"zyadyasser6@gmail.com",  
      date:new Date ('1/5/1992'),
      gender:"male"
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
