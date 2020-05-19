import { Component, OnInit } from '@angular/core';
import { Usuario } from '@app/models/usuario.model';
import { UsuarioService } from '@services/service.index';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { AddModalUsuarioComponent } from '@pages/mantenimiento-usuarios/add-modal-usuario.component';

@Component({
  selector: 'app-mantenimiento-usuarios',
  templateUrl: './mantenimiento-usuarios.component.html',
  styleUrls: ['./mantenimiento-usuarios.component.scss']
})
export class MantenimientoUsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];

  desde: number = 0;

  totalRegistros: number = 0;

  displayedColumns: string[] = ['imagen', 'email', 'nombre', 'role', 'auth', 'icono1', 'icono2'];

  constructor(private _usuarioService: UsuarioService,
              private dialog: MatDialog) {
              }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  addDialog() {
    this.dialog.open(AddModalUsuarioComponent, {
      data: { usuarios: this.usuarios }
    }).afterClosed().subscribe(result => {
      this.cargarUsuarios();
      this._usuarioService.cargarUsuarios()
        .subscribe( (resp: any) => {
          this.cargarUsuarios();
        });
    });
  }

  cargarUsuarios() {
    this._usuarioService.cargarUsuarios(this.desde)
      .subscribe( (resp: any) => {
        console.log(resp);
        this.totalRegistros = resp.total;
        this.usuarios = resp.usuarios;
      });
  }

  cambiarDesde(valor: number) {
    const desde = this.desde + valor;

    if (desde >= this.totalRegistros) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario(termino: string) {
    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }

    this._usuarioService.buscarUsuarios(termino)
      .subscribe( (usuarios: Usuario[]) => {
        this.usuarios = usuarios;
      });
  }

  borrarUsuario(usuario: Usuario) {
    if (usuario._id === this._usuarioService.usuario._id) {
      Swal.fire('No puede borrar usuario', 'No se puede borrar asi mismo', 'error');
      return;
    }

    Swal.fire({
      title: '¿Esta Seguro?',
      text: 'Esta a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar!'
    }).then((borrar) => {
      if (borrar.value) {
        this._usuarioService.borrarUsuario(usuario._id)
          .subscribe( resp => {
            this.cargarUsuarios();
          });
      }
    });

  }

  actualizarUsuario(usuario: Usuario){
    this._usuarioService.actualizarUsuario(usuario)
      .subscribe();
  }

}
