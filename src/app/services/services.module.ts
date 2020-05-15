// Modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modulos Personalizados
import {
  SubirArchivoService,
  VerificaTokenGuard,
  UsuarioService,
  SidebarService,
  AdminGuard,
  LoginGuard
} from '@services/service.index';

@NgModule({
  declarations: [],
  providers: [
    SubirArchivoService,
    VerificaTokenGuard,
    UsuarioService,
    SidebarService,
    AdminGuard,
    LoginGuard
  ],
  imports: [
    CommonModule
  ]
})
export class ServicesModule { }
