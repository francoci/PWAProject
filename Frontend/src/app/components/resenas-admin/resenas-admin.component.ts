import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resenas-admin',
  templateUrl: './resenas-admin.component.html',
  styleUrls: ['./resenas-admin.component.css']
})
export class ResenasAdminComponent implements OnInit {

  resenas : any;
  message : any = "";
  idResena : any;
  role : any;

  constructor(private adminService : AdminService, private router : Router) { }

  async ngOnInit() {

    this.role = localStorage.getItem("role");

    if(this.role != "1") {
      localStorage.clear();
      this.router.navigate(["admin"]);
    }

    let respuesta_server : any = await this.adminService.getResenas();

    if(respuesta_server.status == "ok")
    { 
      this.resenas = respuesta_server.data;
    }
    else {
      this.message = respuesta_server.message;
    }
    
  }

  async aprobar(id){
    this.idResena = id;
    
    let obj = {
      id_resena : this.idResena,
      aprobada_resena : '1'
    }

    let aprobar_ok : any = await this.adminService.aprobarResena(obj);

    if(aprobar_ok.status == 'ok'){

      this.message = "Reseña aprobada.";

      let respuesta_server : any = await this.adminService.getResenas();

      if(respuesta_server.status == "ok")
      { 
        this.resenas = respuesta_server.data;
      }
      else {
        this.message = respuesta_server.message;
      }

    }
    else {
      this.message = "Hubo un error. Inténtelo nuevamente más tarde.";
    }
  }

  async rechazar(id){
    this.idResena = id;
    
    let obj = {
      id_resena : this.idResena,
      aprobada_resena : '2'
    }

    let aprobar_ok : any = await this.adminService.aprobarResena(obj);

    if(aprobar_ok.status == 'ok'){

      this.message = "Reseña rechazada.";

      let respuesta_server : any = await this.adminService.getResenas();

      if(respuesta_server.status == "ok")
      { 
        this.resenas = respuesta_server.data;
      }
      else {
        this.message = respuesta_server.message;
      }

    }
    else {
      this.message = "Hubo un error. Inténtelo nuevamente más tarde.";
    }
  }

}
