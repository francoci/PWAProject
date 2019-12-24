import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService extends BaseService{

  postData(obj){
    try {
      this.setEndpoint('registro');
      // Endpoint http://localhost:3000/registro POST
      return this.post(obj);
    } 
    catch (error) {
      throw error;
    }
  }
  
}
