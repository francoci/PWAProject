import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService extends BaseService{

  async logInAdmin(obj){
    try {
      this.setEndpoint('auth/login'); 
      return this.post(obj); 
    } 
    catch (error) {
      throw error;
    }
  }

  postPelicula(obj){
    try {
      this.setEndpoint('peliculasAdmin');
      // Endpoint http://localhost:3000/peliculasAdmin POST
      return this.post(obj);
    } 
    catch (error) {
      throw error;
    }
  }

  getResenas(){
    try {
      this.setEndpoint('resenasAdmin');
      // Endpoint http://localhost:3000/resenasAdmin GET
      return this.get();
    } 
    catch (error) {
      throw error;
    }
  }

  aprobarResena(obj){
    try {
      this.setEndpoint('resenasAdmin/'+obj.id_resena);
      // Endpoint http://localhost:3000/resenasAdmin/id PUT
      return this.put(obj);
    } 
    catch (error) {
      throw error;
    }
  }

  putPeliculaVisible(obj){
    try {
      this.setEndpoint('peliculasAdmin/visible/'+obj.id_pelicula);
      // Endpoint http://localhost:3000/peliculasAdmin/visible/id PUT
      return this.put(obj);
    } 
    catch (error) {
      throw error;
    }
  }
}
