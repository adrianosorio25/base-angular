import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cliente } from '@src/app/models/cliente.model';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  clientes: Cliente[] = [];
  token: string;

  constructor(public http: HttpClient,
              public router: Router,
              private _snackbar: MatSnackBar) { }


  cargarCliente(desde: number = 0) {
    const url = URL_SERVICIOS + '/cliente?desde=' + desde;

    return this.http.get(url);
  }

  getCliente(id: string) {
    const url = URL_SERVICIOS + '/cliente/' + id;
    return this.http.get(url)
        .pipe(map((resp: any) => resp));
  }

  buscarCliente(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/clientes/' + termino;

    return this.http.get(url)
        .pipe(map((resp: any) => resp.clientes));
  }


  crearCliente( cliente: Cliente) {

    const url = URL_SERVICIOS + '/cliente';

    return this.http.post( url, cliente )
      .pipe(map( (resp: any) => {
        this._snackbar.open('Servicio Creado', resp.cliente.nombres, {
          duration: 2900,
          panelClass: ['success-snackbar']
        });
        return resp.servicio;
      })).pipe(catchError( err => {
        console.log(err);
        this._snackbar.open(err.error.mensaje, err.error.errors.message, {
          duration: 2900
        });
        // tslint:disable-next-line: deprecation
        return Observable.throw(err);
      }));
  }

  borrarCliente(id: number) {
    let url = URL_SERVICIOS + '/cliente/' + id;
    url += '?token=' + this.token;

    return this.http.delete(url)
      .pipe(map( (resp: any) => {
        this._snackbar.open('Cliente Eliminado', resp.cliente.nombres, {
          duration: 2900,
          panelClass: ['danger-snackbar']
        });
        return true;
      }));
  }

  actualizarCliente(cliente: Cliente, id: number) {

    let url = URL_SERVICIOS + '/cliente/' + id;
    url += '?token=' + this.token;

    return this.http.put(url, cliente)
      .pipe(map( (resp: any) => {
        this._snackbar.open('Cliente Actualizado', resp.cliente.nombres, {
          duration: 2900,
          panelClass: ['info-snackbar']
        });

        return true;
      }));
  }
}
