import { Component, OnInit } from '@angular/core';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  peliculas : any [] = [];
  
  constructor(private peliculasService : PeliculasService, private router : Router) { }

  async ngOnInit() {

    let respuesta_server : any = await this.peliculasService.getPeliculasHome();

    if(respuesta_server.status === 'ok')
    {
      this.peliculas = respuesta_server.data;
      console.log(this.peliculas);
    }
  }

  // navigate(id : number){
  //   //Cambio la url: /pelicula/id
  //   this.router.navigate(["pelicula", id]);

  //   //Otra forma de hacerlo, con concatenacion
  //   // this.router.navigateByUrl("/pelicula/" + id);
  // }
}
