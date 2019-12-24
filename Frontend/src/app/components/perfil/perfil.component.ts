import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  id : any;
  usuario : any;
  resenas : any;
  favoritos : any;

  constructor( private activatedRoute : ActivatedRoute, private router : Router, private usuariosService : UsuariosService ) { }

  async ngOnInit() {

    this.id = this.activatedRoute.snapshot.params.id;
    let user_ok : any = await this.usuariosService.getUsuarioProfile(this.id);

    if(user_ok.status == "ok") {
      this.usuario = user_ok.data;
    }

    let resenas_ok : any = await this.usuariosService.getResenasProfile(this.id);

    if(resenas_ok.status == "ok") {
      this.resenas = resenas_ok.data;
      console.log(this.resenas);
    }

    let favoritos_ok : any = await this.usuariosService.getPeliculasProfile(this.id);

    if(favoritos_ok.status == "ok") {
      this.favoritos = favoritos_ok.data;
      console.log(this.favoritos);
    }
  }

}
