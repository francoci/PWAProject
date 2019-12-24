import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { UploadService } from 'src/app/services/upload.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  form : FormGroup;
  selectedFile : File = null;
  url_server = environment.url_server;

  public imagePath;
  imgURL : any = this.url_server + "images/general/placeholder.png";
  public errorImg : string;

  errorGeneral : any = false;
  mensajeGeneral : String = "";

  constructor(private upload : UploadService, private router : Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      'nombre' : new FormControl('', [Validators.required, Validators.minLength(3)]),
      'apellido' : new FormControl('', [Validators.required, Validators.minLength(3)]),
      'mail' : new FormControl('', [Validators.required, Validators.email]),
      'password' : new FormControl('', [Validators.required])
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

  async registrar(){

    if(this.selectedFile == null){
      this.errorImg = "Seleccione un archivo.";
    }
    else {

      this.errorImg = "";

      //Para trabajar con contenido multimedia
      const fd = new FormData();

      // console.log(this.form.value);
        
      //Hago el append de los datos del formulario
      fd.append("nombre", this.form.value.nombre);
      fd.append("apellido", this.form.value.apellido);
      fd.append("mail", this.form.value.mail);
      fd.append("password", this.form.value.password);

      //Hago el append del archivo
      fd.append("file", this.selectedFile, this.selectedFile.name);

      let rta : any = await this.upload.postData(fd);

      if(rta.status == "ok"){
        this.router.navigateByUrl("/messages/1");
      }
      else {
        this.errorGeneral = true;
        this.mensajeGeneral = "Dirección de mail ya en uso.";
      }
      console.log(rta);

    }
    
  }

}
