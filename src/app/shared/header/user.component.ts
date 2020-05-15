import { Component, OnInit } from '@angular/core';
import { Usuario } from '@app/models/usuario.model';
import { UsuarioService } from '@services/service.index';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./header.component.scss']
})
export class UserComponent implements OnInit {

  usuario: Usuario;

  constructor(public _usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuario = this._usuarioService.usuario;
  }

}
