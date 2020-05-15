import { Component, OnInit } from '@angular/core';
import { Usuario } from '@app/models/usuario.model';
import { UsuarioService } from '@services/service.index';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  usuario: Usuario;

  constructor(private _usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuario = this._usuarioService.usuario;
  }

}
