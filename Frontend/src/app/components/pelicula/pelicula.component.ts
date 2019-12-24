import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { ModalManager } from 'ngb-modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})

export class PeliculaComponent implements OnInit {

  //Id de la pelicula
  id_pelicula : any;

  //Datos de la pelicula
  pelicula : any [] = [];

  //Reseñas para la pelicula
  resenas : any [] = [];

  //Mensaje a mostrar si no hay reseñas
  message : any = "";

  //Para saber si esta logueado y si marco como favorito
  login : boolean = false;
  favorito : boolean = false;

  //Para el modal
  modalr : any;
  operacion : boolean = false;

  //Para el rating
  estrella1 : boolean = true;
  estrella2 : boolean = true;
  estrella3 : boolean = true;
  estrella4 : boolean = true;
  estrella5 : boolean = true;

  puntaje : any;
  errorPuntaje : boolean = false;

  message2 : String = "";
  desactivado : boolean = false;
  form : FormGroup;

  constructor(private peliculasService : PeliculasService, private activatedRoute : ActivatedRoute, private router : Router, private modalService : ModalManager) { }

  async ngOnInit() {

    //Capturo el ID
    this.id_pelicula = this.activatedRoute.snapshot.params.id;
    
    let respuesta_server : any = await this.peliculasService.getPelicula(this.id_pelicula);

    if(respuesta_server.status == 'ok'){
      this.pelicula = respuesta_server.data;
    }

    let respuesta_server2 : any = await this.peliculasService.getResenasPelicula(this.id_pelicula);
    
    if(respuesta_server2.status == 'ok'){
      this.resenas = respuesta_server2.data;
    }
    else {
      if(respuesta_server2.status == 'invalid'){
        this.message = respuesta_server2.message;
      }
    }

    //Me fijo si esta logueado
    if(localStorage.getItem("usuario") != null){
      
      this.login = true;

      //Como esta logueado, procedo a ver si marco la pelicula como favorita
      let rta : any = await this.peliculasService.getFavorito(this.id_pelicula);

      if(rta.favorito == '1') {
        this.favorito = true;
      }
      else {
        if(rta.favorito == '0') {
          this.favorito = false;
        }
      }
    }
    else
    {
      this.login = false;
    }

    this.form = new FormGroup({
      'resena' : new FormControl('', [Validators.required]),
    });

  }

  async like()
  {
    let obj = {
      idPelicula : this.id_pelicula
    }
    let like_ok : any = await this.peliculasService.postFavoritos(obj);
    console.log(like_ok);

    if(like_ok.status == "ok")
    {
      //Se marco como favorito
      this.favorito = true;
    }
    else
    {
      this.favorito = false;
    }
  }

  async unlike()
  {
    let unlike_ok : any = await this.peliculasService.deleteFavoritos(this.id_pelicula);

    if(unlike_ok.status == "ok")
    {
      //Se elimino de favoritos
      this.favorito = false;
    }
    else
    {
      this.favorito = true;
    }
  }

  open(mod) {
    this.modalr = this.modalService.open(mod);
  }

  async subirResena() {

    if(this.puntaje == 0 || this.puntaje == null) {
      this.errorPuntaje = true;
    }
    else {
      this.operacion = true;

      //Armo el objeto con los datos
      let obj = {
        "puntaje" : this.puntaje,
        "texto" : this.form.value.resena
      }

      let rta : any = await this.peliculasService.postResena(obj, this.id_pelicula);
      
      if(rta.status == "ok"){
        this.operacion = false;
        this.message2 = "1";
        this.desactivado = true;
      }
      else {
        this.message2 = "2";
      }
    }

  }

  rate(rating) {
    
    this.estrella1 = true;
    this.estrella2 = true;
    this.estrella3 = true;
    this.estrella4 = true;
    this.estrella5 = true;

    this.puntaje = rating;

    if(rating == "1"){
      this.estrella1 = false;
    }

    if(rating == "2"){
      this.estrella1 = false;
      this.estrella2 = false;
    }

    if(rating == "3"){
      this.estrella1 = false;
      this.estrella2 = false;
      this.estrella3 = false;
    }

    if(rating == "4"){
      this.estrella1 = false;
      this.estrella2 = false;
      this.estrella3 = false;
      this.estrella4 = false;
    }

    if(rating == "5"){
      this.estrella1 = false;
      this.estrella2 = false;
      this.estrella3 = false;
      this.estrella4 = false;
      this.estrella5 = false;
    }

    console.log(this.puntaje);
  }
}
