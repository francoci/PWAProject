import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngb-modal';
import { PeliculaComponent } from './components/pelicula/pelicula.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { PeliculasComponent } from './components/peliculas/peliculas.component';
import { MessagesComponent } from './components/messages/messages.component';
import { ActivarComponent } from './components/activar/activar.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { PeliculasAdminComponent } from './components/peliculas-admin/peliculas-admin.component';
import { ResenasAdminComponent } from './components/resenas-admin/resenas-admin.component';
import { UploadComponent } from './components/upload/upload.component';
import { PeliculasListAdminComponent } from './components/peliculas-list-admin/peliculas-list-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PeliculaComponent,
    NavbarComponent,
    LoginComponent,
    RegistroComponent,
    PeliculasComponent,
    MessagesComponent,
    ActivarComponent,
    PerfilComponent,
    LoginAdminComponent,
    HomeAdminComponent,
    PeliculasAdminComponent,
    ResenasAdminComponent,
    UploadComponent,
    PeliculasListAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
