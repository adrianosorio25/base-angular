import { Component, OnInit } from '@angular/core';
import { Usuario } from '@app/models/usuario.model';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '@app/config/config';
import { Servicio } from '@app/models/servicios.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss']
})
export class BusquedaComponent implements OnInit {

  displayedColumns: string[] = ['imagen', 'nombre', 'edit'];

  displayedColumnsService: string[] = ['nombre', 'descripcion', 'edit'];

  usuarios: Usuario[] = [];
  servicios: Servicio[] = [];

  constructor(private activateRoute: ActivatedRoute, private http: HttpClient) {
    activateRoute.params
      .subscribe( params => {
        // tslint:disable-next-line: no-string-literal
        const termino = params['termino'];
        this.buscar(termino);
      });
  }

  ngOnInit(): void {
  }

  buscar(termino: string) {

    const url = URL_SERVICIOS + '/busqueda/todo/' + termino;

    this.http.get(url)
        .subscribe( (resp: any) => {
          this.usuarios = resp.usuarios;
          this.servicios = resp.servicios;
        });
  }

}
