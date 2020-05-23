import { Component, OnInit } from '@angular/core';
import { Servicio } from '@app/models/servicios.model';
import { ServiciosService } from '@services/service.index';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { AddModalServicioComponent } from './add/add-modal-servicio.component';
import { EditModalServicioComponent } from './edit/edit-modal-servicio.component';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss']
})
export class ServiciosComponent implements OnInit {

  servicios: Servicio[] = [];

  isPopupOpened = true;

  desde: number = 0;

  totalRegistros: number = 0;

  displayedColumns: string[] = ['nombre', 'descripcion', 'icono1', 'icono2'];

  constructor(private _servicioService: ServiciosService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.cargarServicios();
  }

  addServicio() {
    const dialogRef = this.dialog.open(AddModalServicioComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.cargarServicios();
    });
  }

  editServicio(id: number) {
    this.isPopupOpened = true;
    const dialogRef = this.dialog.open(EditModalServicioComponent, {
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
      this.cargarServicios();
    });
  }

  cargarServicios() {
    this._servicioService.cargarServicio(this.desde)
      .subscribe( (resp: any) => {
        this.totalRegistros = resp.total;
        this.servicios = resp.servicios;
      });
  }

  cambiarDesde(valor: number) {
    const desde = this.desde + valor;

    if (desde >= this.totalRegistros) {
      return;
    }

    this.desde += valor;
    this.cargarServicios();
  }

  buscarServicio(termino: string) {
    if (termino.length <= 0) {
      this.cargarServicios();
      return;
    }

    this._servicioService.buscarServicio(termino)
      .subscribe( (servicios: Servicio[]) => {
        this.servicios = servicios;
      });
  }

  borrarServicio(servicio: Servicio) {
    Swal.fire({
      title: '¿Esta Seguro?',
      text: 'Esta a punto de borrar a: ' + servicio.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar!'
    }).then((borrar) => {
      if (borrar.value) {
        this._servicioService.borrarServicio(servicio._id)
          .subscribe( resp => {
            this.cargarServicios();
          });
      }
    });
  }

}
