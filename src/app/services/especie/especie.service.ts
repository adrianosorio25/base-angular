import { Injectable } from '@angular/core';
import { Especie } from '@src/app/models/especie.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EspecieService {

  especies: Especie[] = [];
  token: string;

  constructor(public http: HttpClient, public router: Router, private _snackbar: MatSnackBar) {}

  cargarEspecie(desde: number = 0) {
    const url = URL_SERVICIOS + '/especie?desde=' + desde;

    return this.http.get(url)
      .pipe(map( (resp: any) => {
        return resp.especies;
      }));
  }

  cargarEspecieId(id: string) {
    const url = URL_SERVICIOS + '/especie/' + id;
    return this.http.get(url)
        .pipe(map((resp: any) => resp));
  }

  buscarEspecie(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/especies/' + termino;

    return this.http.get(url)
        .pipe(map((resp: any) => resp.especies));
  }

  crearEspecie( especie: Especie) {

    const url = URL_SERVICIOS + '/especie';

    return this.http.post( url, especie )
      .pipe(map( (resp: any) => {
        this._snackbar.open('Especie Creada', resp.especie.especie, {
          duration: 2900,
          panelClass: ['success-snackbar']
        });
        return resp.especie;
      })).pipe(catchError( err => {
        console.log(err);
        this._snackbar.open(err.error.mensaje, err.error.errors.message, {
          duration: 2900
        });
        // tslint:disable-next-line: deprecation
        return Observable.throw(err);
      }));
  }

  actualizarEspecie(especie: Especie, id: number) {

    let url = URL_SERVICIOS + '/especie/' + id;
    url += '?token=' + this.token;

    return this.http.put(url, especie)
      .pipe(map( (resp: any) => {
        this._snackbar.open('Especie Actualizada', resp.especie.especie, {
          duration: 2900,
          panelClass: ['info-snackbar']
        });

        return true;
      }));
  }

  borrarEspecie(id: number) {
    let url = URL_SERVICIOS + '/especie/' + id;
    url += '?token=' + this.token;

    return this.http.delete(url)
      .pipe(map( (resp: any) => {
        this._snackbar.open('Especie Eliminada', resp.especie.especie, {
          duration: 2900,
          panelClass: ['danger-snackbar']
        });
        return true;
      }));
  }
}
