import { Injectable } from '@angular/core';
import { Usuario } from '@app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '@app/config/config';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SubirArchivoService } from '@services/subirArchivo/subir-archivo.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[] = [];

  constructor( public http: HttpClient,
               public router: Router,
               private _snackbar: MatSnackBar,
               public _subirArchivoService: SubirArchivoService) {
    this.cargarStorage();
  }

  renuevaToken() {
    let url = URL_SERVICIOS + '/login/renuevatoken';
    url += '?token=' + this.token;

    return this.http.get(url)
        .pipe(map( (resp: any) => {
          this.token = resp.token;
          localStorage.setItem('token', this.token);
          return true;
        })).pipe(catchError(err => {
          this.router.navigate(['/login']);
          this._snackbar.open('No se pudo renovar token', '', {
            duration: 2900,
            panelClass: ['danger-snackbar']
          });
          // tslint:disable-next-line: deprecation
          return Observable.throw(err);
        }));
  }

  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {

    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  guardarStorage( id: string, token: string, usuario: Usuario, menu: any ) {

    localStorage.setItem('id', id );
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;

  }

  logout() {
    this.usuario = null;
    this.token = '';
    this.menu = [];

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
  }

  loginGoogle(token: string) {

    const url = URL_SERVICIOS + '/login/google';

    return this.http.post( url, {token} )
      .pipe(map( (resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);

        this.usuario = resp.usuario;
        return true;
      }));
  }

  login( usuario: Usuario, recordar: boolean = false) {

    if ( recordar ) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICIOS + '/login';

    return this.http.post( url, usuario)
        .pipe(map( (resp: any) => {
          this._snackbar.open('Bienvenido', resp.usuario.nombre, {
            duration: 2900,
            panelClass: ['info-snackbar']
          });
          this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
          this.usuario = resp.usuario;
          return true;
        })).pipe(catchError(err => {
          this._snackbar.open('Error en el login', err.error.mensaje, {
            duration: 2900,
            panelClass: ['danger-snackbar']
          });
          // tslint:disable-next-line: deprecation
          return Observable.throw(err);
        }));
  }

  crearUsuario( usuario: Usuario) {

    const url = URL_SERVICIOS + '/usuario';

    return this.http.post( url, usuario )
      .pipe(map( (resp: any) => {
        this._snackbar.open('Usuario Creado', resp.usuario.nombre, {
          duration: 2900,
          panelClass: ['success-snackbar']
        });
        return resp.usuario;
      })).pipe(catchError( err => {
        console.log(err);
        this._snackbar.open(err.error.mensaje, err.error.errors.message, {
          duration: 2900,
          panelClass: ['danger-snackbar']
        });
        // tslint:disable-next-line: deprecation
        return Observable.throw(err);
      }));
  }

  actualizarUsuario(usuario: Usuario) {

    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.put(url, usuario)
      .pipe(map( (resp: any) => {

        if ( usuario._id === this.usuario._id) {
          const usuarioDB: Usuario = resp.usuario;
          this.guardarStorage( usuarioDB._id, this.token, usuarioDB, this.menu);
        }

        this._snackbar.open('Usuario Actualizado', resp.usuario.nombre, {
          duration: 2900,
          panelClass: ['info-snackbar']
        });

        return true;
      }));
  }

  cambiarImagen(archivo: File, id: string) {

    this._subirArchivoService.subirArchivo( archivo, 'usuarios', id)
      .then( (resp: any) => {
        this.usuario.img = resp.usuario.img;

        this.guardarStorage(id, this.token, this.usuario, this.menu);
      }).catch( resp => {
        console.log(resp);
      });

  }

  cargarUsuarios(desde: number = 0) {

    const url = URL_SERVICIOS + '/usuario?desde=' + desde;

    return this.http.get(url);
  }

  buscarUsuarios(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;

    return this.http.get(url)
        .pipe(map((resp: any) => resp.usuarios));
  }

  borrarUsuario(id: string) {
    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;

    return this.http.delete(url)
      .pipe(map( (resp: any) => {
        this._snackbar.open('Usuario Eliminado', resp.usuario.nombre, {
          duration: 2900,
          panelClass: ['danger-snackbar']
        });
        return true;
      }));
  }

}
