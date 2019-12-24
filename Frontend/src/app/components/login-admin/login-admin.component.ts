import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  error : string = '';
  form : FormGroup;

  constructor(private usuariosService : UsuariosService, private router : Router) { }

  ngOnInit() {

    if(localStorage.getItem("role") == "1"){
      this.router.navigate(["/admin/home"]);
    }
    else {
      localStorage.clear();
    }
    
    this.form = new FormGroup({
      'user' : new FormControl('', [Validators.required]),
      'password' : new FormControl('', [Validators.required])
    });
  }

  async login()
  {
    let usr_ok : any = await this.usuariosService.logInUsuario(this.form.value);

    if(usr_ok.status == "ok" && usr_ok.usuario.role == 'admin')
    {
      //Si se loguea bien
      localStorage.setItem("usuario", usr_ok.JWT);
      localStorage.setItem("id", usr_ok.usuario.id);
      localStorage.setItem("nombre", usr_ok.usuario.nombre);
      localStorage.setItem("role", "1");
      this.router.navigate(["/admin/home"]);
    }
    else
    {
      if(usr_ok.status == "invalid")
      {
        //Usuario o contraseña incorrecta, o cuenta no confirmada
        this.error = usr_ok.message;
      }

      if(usr_ok.usuario.role != 'admin')
      {
        //Usuario no admin
        this.error = "Usuario no admin.";
      }
    }
  }

}
