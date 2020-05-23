import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { URL_SERVICIOS } from '@app/config/config';
import { map, catchError } from 'rxjs/operators';
import { Personal } from '@src/app/models/personal.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  personal: Personal[] = [];

  constructor(private http: HttpClient, private _snackbar: MatSnackBar) {}

  cargarPersonal() {
    const url = URL_SERVICIOS + '/personal';

    return this.http.get( url)
      .pipe(map( (resp: any) => {
        return resp.personal;
      }));
  }

  cargarPersonalId(id: string) {
    const url = URL_SERVICIOS + '/personal/' + id;
    return this.http.get(url)
        .pipe(map((resp: any) => resp));
  }

  buscarPersonal(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/personal/' + termino;

    return this.http.get(url)
        .pipe(map((resp: any) => resp.personal));
  }

  crearPersonal( personal: Personal) {

    const url = URL_SERVICIOS + '/personal';
    // url += '?token=' + this.token;

    return this.http.post( url, personal )
      .pipe(map( (resp: any) => {
        this._snackbar.open('Personal Creado', resp.personal.nombres, {
          duration: 2900,
          panelClass: ['success-snackbar']
        });
        return resp.personal;
      })).pipe(catchError( err => {
        console.log(err);
        this._snackbar.open(err.error.mensaje, err.error.errors.message, {
          duration: 2900
        });
        // tslint:disable-next-line: deprecation
        return Observable.throw(err);
      }));
  }

  actualizarPersonal(personal: Personal, id: number) {

    const url = URL_SERVICIOS + '/personal/' + id;
    // url += '?token=' + this._usuarioService.token;

    return this.http.put(url, personal)
      .pipe(map( (resp: any) => {
        this._snackbar.open('Personal Actualizado', resp.personal.nombres, {
          duration: 2900,
          panelClass: ['info-snackbar']
        });

        return true;
      }));
  }

  borrarPersonal(id: number) {
    const url = URL_SERVICIOS + '/personal/' + id;
    // url += '?token=' + this._usuarioService.token;

    return this.http.delete(url)
      .pipe(map( (resp: any) => {
        this._snackbar.open('Personal Eliminado', resp.personal.nombres, {
          duration: 2900,
          panelClass: ['danger-snackbar']
        });
        return true;
      }));
  }
}
