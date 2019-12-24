import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PeliculaComponent } from './components/pelicula/pelicula.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { RegistroComponent } from 'src/app/components/registro/registro.component';
import { PeliculasComponent } from 'src/app/components/peliculas/peliculas.component';
import { MessagesComponent } from './components/messages/messages.component';
import { ActivarComponent } from 'src/app/components/activar/activar.component';
import { PerfilComponent } from 'src/app/components/perfil/perfil.component';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { ResenasAdminComponent } from './components/resenas-admin/resenas-admin.component';
import { PeliculasAdminComponent } from './components/peliculas-admin/peliculas-admin.component';
import { PeliculasListAdminComponent } from './components/peliculas-list-admin/peliculas-list-admin.component';


const routes: Routes = [
  {path : 'home', component : HomeComponent},
  {path : 'pelicula/:id', component : PeliculaComponent},
  {path : 'login', component : LoginComponent},
  {path : 'registro', component : RegistroComponent},
  {path : 'peliculas', component : PeliculasComponent},
  {path : 'messages/:msg', component : MessagesComponent},
  {path : 'activar/:codigo', component : ActivarComponent},
  {path : 'perfil/:id', component : PerfilComponent},
  {path : 'admin', component : LoginAdminComponent},
  {path : 'admin/home', component : HomeAdminComponent},
  {path : 'admin/resenas', component : ResenasAdminComponent},
  {path : 'admin/peliculas', component : PeliculasAdminComponent},
  {path : 'admin/listPeliculas', component : PeliculasListAdminComponent},
  {path : '**', redirectTo : 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
