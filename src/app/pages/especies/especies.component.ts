import { Component, OnInit } from '@angular/core';
import { Especie } from '@src/app/models/especie.model';
import { EspecieService } from '@services/service.index';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { AddEspecieComponent } from '@pages/especies/add/add-especie.component';
import { EditEspecieComponent } from '@pages/especies/edit/edit-especie.component';

@Component({
  selector: 'app-especies',
  templateUrl: './especies.component.html',
  styleUrls: ['./especies.component.scss']
})
export class EspeciesComponent implements OnInit {

  especies: Especie[] = [];

  desde: number = 0;

  totalRegistros: number = 0;

  displayedColumns: string[] = ['especie', 'icono1', 'icono2'];

  constructor(private _servicioEspecie: EspecieService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.cargarEspecies();
  }

  cargarEspecies() {
    this._servicioEspecie.cargarEspecie(this.desde)
      .subscribe( (resp: any) => {
        this.totalRegistros = resp.total;
        this.especies = resp;
      });
  }

  cambiarDesde(valor: number) {
    const desde = this.desde + valor;

    if (desde >= this.totalRegistros) {
      return;
    }

    this.desde += valor;
    this.cargarEspecies();
  }

  buscarEspecie(termino: string) {
    if (termino.length <= 0) {
      this.cargarEspecies();
      return;
    }

    this._servicioEspecie.buscarEspecie(termino)
      .subscribe( (especies: Especie[]) => {
        this.especies = especies;
      });
  }

  addEspecie() {
    const dialogRef = this.dialog.open(AddEspecieComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.cargarEspecies();
    });
  }

  editEspecie(id: number) {
    const dialogRef = this.dialog.open(EditEspecieComponent, {
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      this.cargarEspecies();
    });
  }

  borrarEspecie(especie: Especie) {
    Swal.fire({
      title: '¿Esta Seguro?',
      text: 'Esta a punto de borrar a: ' + especie.especie,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar!'
    }).then((borrar) => {
      if (borrar.value) {
        this._servicioEspecie.borrarEspecie(especie._id)
          .subscribe( resp => {
            this.cargarEspecies();
          });
      }
    });
  }

}
