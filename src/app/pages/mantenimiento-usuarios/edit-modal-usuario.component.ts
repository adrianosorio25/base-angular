import { Component, OnInit } from '@angular/core';
import { Usuario } from '@app/models/usuario.model';
import { UsuarioService } from '@services/service.index';

@Component({
  selector: 'app-edit-modal-usuario',
  templateUrl: './edit-modal-usuario.component.html',
  styles: [
  ]
})
export class EditModalUsuarioComponent implements OnInit {

  usuario: Usuario;

  id: string;

  constructor(public _usuarioService: UsuarioService) {
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit(): void {
  }

  guardar(usuario: Usuario) {
    this.usuario.nombre = usuario.nombre;
    this.usuario.role = usuario.role;

    if (!this.usuario.google) {
      this.usuario.email = usuario.email;
    }

    this._usuarioService.actualizarUsuario(this.usuario)
      .subscribe();
  }

}
