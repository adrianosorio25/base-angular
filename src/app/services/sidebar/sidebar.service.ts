import { Injectable } from '@angular/core';
import { UsuarioService } from '@services/usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  home: any = [
    {
      titulo: 'Home',
      submenu: [
        { titulo: 'Dashboard', url: '/dashboard', icon: 'dashboard'},
        { titulo: 'Perfil', url: '/profile', icon: 'person'},
        { titulo: 'Logout', url: '/login', icon: 'power_settings_new'}
      ]
    }
  ];

  menu: any[] = [];

  constructor(public _usuarioService: UsuarioService) {}

  cargarMenu() {
    this.menu = this._usuarioService.menu;
  }
}
