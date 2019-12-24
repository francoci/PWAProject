import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-activar',
  templateUrl: './activar.component.html',
  styleUrls: ['./activar.component.css']
})
export class ActivarComponent implements OnInit {

  activar : any = "";
  message : any = "";
  activado : boolean;

  constructor ( private activatedRoute : ActivatedRoute, private router : Router, private usuariosService : UsuariosService ) {}
  
  async ngOnInit() {

    this.activar = this.activatedRoute.snapshot.params.codigo;

    let obj = {
      codigo : this.activar
    }

    let conf_ok : any = await this.usuariosService.activarUsuario(obj);

    console.log(conf_ok);
    if(conf_ok.status == "ok") {
      this.message = "Activación completada.";
      this.activado = true;
    }
    else {
      if(conf_ok.status == "invalid") {
        this.message = "El código de activación es inválido o su cuenta ya fue activada.";
      }
    }

  }

}
