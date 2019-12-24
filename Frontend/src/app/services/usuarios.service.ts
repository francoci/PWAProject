import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService extends BaseService{

  async logInUsuario(obj){
    try {
      this.setEndpoint('auth/login'); 
      return this.post(obj); 
    } 
    catch (error) {
      throw error;
    }
  }
  
  async activarUsuario(obj){
    try {
      this.setEndpoint('registro/'+obj.codigo); 
      return this.post(obj); 
    } 
    catch (error) {
      throw error;
    }
  }

  async getUsuarioProfile(id){
    try {
      this.setEndpoint('profile/'+id); 
      return this.get(); 
    } 
    catch (error) {
      throw error;
    }
  }

  async getResenasProfile(id){
    try {
      this.setEndpoint('profile/resenas/'+id); 
      return this.get(); 
    } 
    catch (error) {
      throw error;
    }
  }

  async getPeliculasProfile(id){
    try {
      this.setEndpoint('profile/peliculas/'+id); 
      return this.get(); 
    } 
    catch (error) {
      throw error;
    }
  }
}
