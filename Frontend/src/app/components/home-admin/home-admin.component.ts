import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

  role : any;

  constructor(private router : Router) { }

  ngOnInit() {

    this.role = localStorage.getItem("role");

    if(this.role != "1") {
      localStorage.clear();
      this.router.navigate(["admin"]);
    }
  }

}
