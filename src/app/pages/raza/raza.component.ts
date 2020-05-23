import { Component, OnInit } from '@angular/core';
import { Raza } from '@src/app/models/raza.model';
import { RazasService } from '@services/service.index';
import { MatDialog } from '@angular/material/dialog';
import { AddRazaComponent } from './add/add-raza.component';
import { EditRazaComponent } from './edit/edit-raza.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-raza',
  templateUrl: './raza.component.html',
  styleUrls: ['./raza.component.scss']
})
export class RazaComponent implements OnInit {

  razas: Raza[] = [];

  desde: number = 0;

  totalRegistros: number = 0;

  displayedColumns: string[] = ['nombre', 'especie', 'icono1', 'icono2'];

  constructor(private _servicioRaza: RazasService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.cargarRazas();
  }

  cargarRazas() {
    this._servicioRaza.cargarRaza(this.desde)
      .subscribe( (resp: any) => {
        this.totalRegistros = resp.total;
        this.razas = resp;
      });
  }

  cambiarDesde(valor: number) {
    const desde = this.desde + valor;

    if (desde >= this.totalRegistros) {
      return;
    }

    this.desde += valor;
    this.cargarRazas();
  }

  buscarRaza(termino: string) {
    if (termino.length <= 0) {
      this.cargarRazas();
      return;
    }

    this._servicioRaza.buscarRaza(termino)
      .subscribe( (razas: Raza[]) => {
        this.razas = razas;
      });
  }

  addRaza() {
    const dialogRef = this.dialog.open(AddRazaComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.cargarRazas();
    });
  }

  editRaza(id: number) {
    const dialogRef = this.dialog.open(EditRazaComponent, {
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      this.cargarRazas();
    });
  }

  borrarRaza(raza: Raza) {
    Swal.fire({
      title: '¿Esta Seguro?',
      text: 'Esta a punto de borrar a: ' + raza.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar!'
    }).then((borrar) => {
      if (borrar.value) {
        this._servicioRaza.borrarRaza(raza._id)
          .subscribe( resp => {
            this.cargarRazas();
          });
      }
    });
  }

}
