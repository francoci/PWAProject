import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';

@Injectable({
  providedIn: 'root'
})

export class PeliculasService extends BaseService {

  async getFavorito(idPelicula){

    //Endpoint: /favoritos/idPelicula
    //URL: http://localhost:3000/favoritos/idPelicula GET

    try {

      this.setEndpoint('favoritos/'+idPelicula);
      return this.get();

    } 
    catch (error) {
      console.log(error);
    }
  }

  async postFavoritos(obj){

    //Endpoint: /favoritos/idPelicula
    //URL: http://localhost:3000/favoritos/idPelicula DELETE

    try {

      this.setEndpoint('favoritos/'+obj.idPelicula);
      return this.post(obj);

    } 
    catch (error) {
      console.log(error);
    }
  }

  
  async deleteFavoritos(idPelicula){

    //Endpoint: /favoritos/idPelicula
    //URL: http://localhost:3000/favoritos/idPelicula DELETE

    try {

      this.setEndpoint('favoritos/'+idPelicula);
      return this.delete();

    } 
    catch (error) {
      console.log(error);
    }
  }

  async getPeliculasHome(){
    
    //Endpoint: /peliculas/home
    //URL: http://localhost:3000/peliculas/home

    try {

      this.setEndpoint('peliculas/home');
      return this.get();

    } 
    catch (error) {
      console.log(error);
    }
  }

  async getPeliculas(){
    
    //Endpoint: /peliculas
    //URL: http://localhost:3000/peliculas

    try {

      this.setEndpoint('peliculas');
      return this.get();

    } 
    catch (error) {
      console.log(error);
    }
  }

  async getPeliculasFiltro(genero, antiguedad){
    
    //Endpoint: /peliculas/filtro?gen=x&ant=y
    //URL: http://localhost:3000/peliculas/filtro

    try {

      this.setEndpoint('peliculas/filtro?gen='+genero+'&ant='+antiguedad);
      return this.get();

    } 
    catch (error) {
      console.log(error);
    }
  }

  async getPelicula(id){
    
    //Endpoint: /peliculas
    //URL: http://localhost:3000/peliculas/id

    try {

      this.setEndpoint('peliculas/'+id);
      return this.get();

    } 
    catch (error) {
      console.log(error);
    }
  }

  async getResenasPelicula(id){
    
    //Endpoint: /peliculas
    //URL: http://localhost:3000/peliculas/resenas/id

    try {

      this.setEndpoint('peliculas/resenas/'+id);
      return this.get();

    } 
    catch (error) {
      console.log(error);
    }
  }

  async postResena(obj,id){

    //Endpoint: /resenas/idPelicula
    //URL: http://localhost:3000/resenas/idPelicula POST

    try {

      this.setEndpoint('resenas/'+id);
      return this.post(obj);

    } 
    catch (error) {
      console.log(error);
    }
  }

}
