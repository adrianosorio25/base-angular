import { Injectable } from '@angular/core';
import { Raza } from '@src/app/models/raza.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { URL_SERVICIOS } from '@app/config/config';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class RazasService {

  razas: Raza[] = [];

  totalRazas: number = 0;

  constructor(public http: HttpClient, public router: Router, private _snackbar: MatSnackBar,
              private _usuarioService: UsuarioService) {}

  cargarRaza(desde: number = 0) {
    const url = URL_SERVICIOS + '/raza?desde=' + desde;

    return this.http.get(url)
      .pipe(map( (resp: any) => {
        return resp.razas;
      }));
  }

  cargarRazaId(id: string) {
    const url = URL_SERVICIOS + '/raza/' + id;
    return this.http.get(url)
        .pipe(map((resp: any) => resp));
  }

  buscarRaza(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/razas/' + termino;

    return this.http.get(url)
        .pipe(map((resp: any) => resp.razas));
  }

  crearRaza( raza: Raza) {

    const url = URL_SERVICIOS + '/raza';
    // url += '?token=' + this.token;

    return this.http.post( url, raza )
      .pipe(map( (resp: any) => {
        this._snackbar.open('Raza Creada', resp.raza.nombre, {
          duration: 2900,
          panelClass: ['success-snackbar']
        });
        return resp.raza;
      })).pipe(catchError( err => {
        console.log(err);
        this._snackbar.open(err.error.mensaje, err.error.errors.message, {
          duration: 2900
        });
        // tslint:disable-next-line: deprecation
        return Observable.throw(err);
      }));
  }

  actualizarRaza(raza: Raza, id: number) {

    let url = URL_SERVICIOS + '/raza/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put(url, raza)
      .pipe(map( (resp: any) => {
        this._snackbar.open('Raza Actualizada', resp.raza.nombre, {
          duration: 2900,
          panelClass: ['info-snackbar']
        });

        return true;
      }));
  }

  borrarRaza(id: number) {
    let url = URL_SERVICIOS + '/raza/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete(url)
      .pipe(map( (resp: any) => {
        this._snackbar.open('Raza Eliminada', resp.raza.nombre, {
          duration: 2900,
          panelClass: ['danger-snackbar']
        });
        return true;
      }));
  }
}
