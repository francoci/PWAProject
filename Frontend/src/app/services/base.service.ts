import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class BaseService {

  //Guardo la url seteada en el archivo environment.ts (http://localhost:3000/)
  url_server = environment.url_server;

  //El endpoint es lo que se agregara luego de la barra de la url
  endpoint = "";

  constructor(private http : HttpClient, private router : Router) { }

  //Funcion para setear el endpoint
  setEndpoint(endpoint) {
    this.endpoint = endpoint;
  }

  //Para setear los HTTP headers
  getHttpOptions(){

    let httpHeadersOptions : any = {};

    try {

      if(localStorage.getItem("usuario") != null && localStorage.getItem("role") != "1") {

        // content type : application/json
        // authorization : token
        httpHeadersOptions = {
          
          headers : new HttpHeaders({
            'content-type' : 'application/json',
            Authorization : localStorage.getItem("usuario")
          })

        }
      }
      else
      {
        if(localStorage.getItem("role") == "1"){
          httpHeadersOptions = {
          
            headers : new HttpHeaders({
              Authorization : localStorage.getItem("usuario")
            })
  
          }
        }
        else {
          // Si no esta logueado, las cabeceras solo van a tener el content-type
          httpHeadersOptions = {
            headers : new HttpHeaders({
              // Hay que agregar un if para las imagenes, multipart/form-data
              // 'content-type' : 'application/json'
            })
          }
        }
        
      }

      return httpHeadersOptions;

    } 
    catch (error) {

      console.log(error);
      
    }
  }

  processResponseError(e){
    
    // console.log(e);
    if(e.status == 401)
    {
      console.log("ERROR 401");
      localStorage.clear();
      // this.router.navigate(['/']);
      location.reload();
    }
    else {
      throw e;
    }
  }

  //Para peticiones GET
  async get() {
    
    try{
      
      const options : any = this.getHttpOptions();
      return this.http.get(this.url_server + this.endpoint, options).toPromise().catch(error=> this.processResponseError(error));

    }
    catch(error){
      this.processResponseError(error);
    }
  }

  //Para peticiones POST
  async post(obj) {

    try{

      const options : any = this.getHttpOptions();
      return this.http.post(this.url_server + this.endpoint, obj, options).toPromise().catch(error=> this.processResponseError(error));;

    }
    catch(error){

      console.log(error);
      this.processResponseError(error);

    }
  }

  //Para peticiones DELETE de favorito
  async delete() {

    try{

      const options : any = this.getHttpOptions();
      return this.http.delete(this.url_server + this.endpoint, options).toPromise().catch(error=> this.processResponseError(error));;

    }
    catch(error){

      console.log(error);
      this.processResponseError(error);

    }
  }


  //Para peticiones PUT
  async put(obj) {
    
    try {

      const options = this.getHttpOptions();
      return this.http.put(this.url_server + this.endpoint, obj, options).toPromise().catch(error=> this.processResponseError(error));;
      
    } 
    catch(error) {

      throw error;

    }

  }
  
}
