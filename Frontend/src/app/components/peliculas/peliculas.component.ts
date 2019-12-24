import { Component, OnInit } from '@angular/core';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent implements OnInit {

  peliculas : any [] = [];
  generoElegido : string = '0';
  antiguedadElegida : string = '1';

  constructor(private peliculasService : PeliculasService, private router : Router) { }

  async ngOnInit() {

    let respuesta_server : any = await this.peliculasService.getPeliculas();

    if(respuesta_server.status === 'ok')
    {
      this.peliculas = respuesta_server.data;
      console.log(this.peliculas);
    }
  }

  async selectAntiguedad(val){

    this.antiguedadElegida = val;
    let rta : any = await this.peliculasService.getPeliculasFiltro(this.generoElegido, this.antiguedadElegida);

    if(rta.status === 'ok')
    {
      this.peliculas = rta.data;
      console.log(this.peliculas);
    }

  }

  async selectGenero(val){

    this.generoElegido = val;
    let rta : any = await this.peliculasService.getPeliculasFiltro(this.generoElegido, this.antiguedadElegida);

    if(rta.status === 'ok')
    {
      this.peliculas = rta.data;
      console.log(this.peliculas);
    }

  }

}
