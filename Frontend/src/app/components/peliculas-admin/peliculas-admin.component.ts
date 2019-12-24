import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AdminService } from 'src/app/services/admin.service';


@Component({
  selector: 'app-peliculas-admin',
  templateUrl: './peliculas-admin.component.html',
  styleUrls: ['./peliculas-admin.component.css']
})

export class PeliculasAdminComponent implements OnInit {

  role : any;
  url_server = environment.url_server;
  form : FormGroup;

  public imagePath;
  imgURL : any = this.url_server + "images/general/placeholderPelicula.png";
  public errorImg : string;

  selectedFile : File = null;
  genero = "";
  errorGenero : String = "";
  mensajeGeneral : String = "";
  mensajeGeneralNum : String = "";

  constructor(private router : Router, private adminService : AdminService) { }

  ngOnInit() {
    
    this.role = localStorage.getItem("role");

    if(this.role != "1") {
      localStorage.clear();
      this.router.navigate(["admin"]);
    }

    this.form = new FormGroup({
      'nombrePelicula' : new FormControl('', [Validators.required, Validators.minLength(3)]),
      'anoPelicula' : new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"),Validators.maxLength(4)]),
      'directorPelicula' : new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z ,.]*$")]),
      'sinopsisPelicula' : new FormControl('', [Validators.required])
    });

  }

  preview(imagen) {

    if (imagen.target.files.length === 0) {
      return;
    }
 
    var mimeType = imagen.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.errorImg = "Solo imagenes.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = imagen.target.files;
    reader.readAsDataURL(imagen.target.files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result;
    }

    this.selectedFile = imagen.target.files[0];
  }

  selectGenero(val){
    this.genero = val;
  }

  async cargarPelicula(){
    
    if(this.selectedFile == null){
      this.errorImg = "Seleccione un archivo.";
    }
    else {
      if(this.genero == "") {
        this.errorGenero = "Seleccione una opción."
      }
      else {

        //Para trabajar con contenido multimedia
        const fd = new FormData();

        //Hago el append de los datos del formulario
        fd.append("nombre", this.form.value.nombrePelicula);
        fd.append("ano", this.form.value.anoPelicula);

        //Hago el append del Genero (SELECT)
        fd.append("genero", this.genero);

        fd.append("sinopsis", this.form.value.sinopsisPelicula);
        fd.append("director", this.form.value.directorPelicula);

        //Hago el append del archivo
        fd.append("file", this.selectedFile, this.selectedFile.name);

        let rta : any = await this.adminService.postPelicula(fd);

        if(rta.status == "ok"){
          this.mensajeGeneral = "Carga exitosa.";
          this.mensajeGeneralNum = "1";
        }
        else {
          this.mensajeGeneral = "Hubo un error. Inténtelo nuevamente más tarde.";
          this.mensajeGeneralNum = "2";
        }

      }
    }

  }
}
