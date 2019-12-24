import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  login : boolean;
  admin : boolean;
  nombre : string = '';
  idUser : any;
  url_server = environment.url_server;

  constructor(private router : Router) { }

  ngOnInit() {

    if(localStorage.getItem("usuario") != null){

      if(localStorage.getItem("role") == "1") {
        this.nombre = localStorage.getItem("nombre");
        this.idUser = localStorage.getItem("id");
        this.login = true;
        this.admin = true;
        console.log(this.admin);
      }
      else {
        this.nombre = localStorage.getItem("nombre");
        this.idUser = localStorage.getItem("id");
        this.login = true;
        this.admin = false;
        console.log(this.admin);
      }
      
    }
    else
    {
      this.login = false;
      console.log(this.admin);
    } 
  }

  logout(){
    localStorage.clear();
    this.login = false;
    this.router.navigate(["home"]);
  }

}
