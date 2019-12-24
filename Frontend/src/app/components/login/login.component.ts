import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  
  error : string = '';
  form : FormGroup;

  constructor(private adminService : AdminService, private router : Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      'user' : new FormControl('', [Validators.required]),
      'password' : new FormControl('', [Validators.required])
    });
  }

  async login()
  {
    let usr_ok : any = await this.adminService.logInAdmin(this.form.value);

    if(usr_ok.status == "ok")
    {
      if(usr_ok.usuario.role == 'admin'){

        //Si se loguea bien y es admin
        localStorage.setItem("usuario", usr_ok.JWT);
        localStorage.setItem("id", usr_ok.usuario.id);
        localStorage.setItem("nombre", usr_ok.usuario.nombre);
        localStorage.setItem("role", "1");
        this.router.navigate(["home"]);
      }
      else {
        //Si se loguea bien
        localStorage.setItem("usuario", usr_ok.JWT);
        localStorage.setItem("id", usr_ok.usuario.id);
        localStorage.setItem("nombre", usr_ok.usuario.nombre);
        this.router.navigate(["home"]);
      }
    }
    else
    {
      if(usr_ok.status == "invalid")
      {
        //Usuario o contraseña incorrecta, o cuenta no confirmada
        this.error = usr_ok.message;
      }
    }
  }

}
