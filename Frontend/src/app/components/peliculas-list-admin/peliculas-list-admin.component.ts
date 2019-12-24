import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-peliculas-list-admin',
  templateUrl: './peliculas-list-admin.component.html',
  styleUrls: ['./peliculas-list-admin.component.css']
})
export class PeliculasListAdminComponent implements OnInit {

  peliculas : any;
  message : any = "";
  idPelicula : any;
  role : any;

  constructor(private adminService : AdminService, private peliculasService : PeliculasService, private router : Router) { }

  async ngOnInit() {

    this.role = localStorage.getItem("role");

    if(this.role != "1") {
      localStorage.clear();
      this.router.navigate(["admin"]);
    }

    let respuesta_server : any = await this.peliculasService.getPeliculas();

    if(respuesta_server.status == "ok")
    { 
      this.peliculas = respuesta_server.data;
    }
    else {
      this.message = respuesta_server.message;
    }
    //.adminService.putPeliculaVisible();

  }

  async visible(visibilidad, id) {

    let obj = {
      visible : visibilidad,
      id_pelicula : id
    }

    let respuesta_server : any = await this.adminService.putPeliculaVisible(obj);

    if(respuesta_server.status == "ok") {
      let respuesta_server : any = await this.peliculasService.getPeliculas();

      if(respuesta_server.status == "ok")
      { 
        this.peliculas = respuesta_server.data;
      }
      else {
        this.message = respuesta_server.message;
      }

    }
  }

}
