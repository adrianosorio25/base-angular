// Modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modulos Personalizados
import {
  SubirArchivoService,
  VerificaTokenGuard,
  ServiciosService,
  PersonalService,
  ClientesService,
  UsuarioService,
  EspecieService,
  SidebarService,
  RazasService,
  AdminGuard,
  LoginGuard
} from '@services/service.index';

@NgModule({
  declarations: [],
  providers: [
    SubirArchivoService,
    VerificaTokenGuard,
    ServiciosService,
    PersonalService,
    ClientesService,
    UsuarioService,
    EspecieService,
    SidebarService,
    RazasService,
    AdminGuard,
    LoginGuard
  ],
  imports: [
    CommonModule
  ]
})
export class ServicesModule { }
