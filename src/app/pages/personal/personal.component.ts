import { Component, OnInit } from '@angular/core';
import { Personal } from '@src/app/models/personal.model';
import { PersonalService } from '@services/service.index';
import { MatDialog } from '@angular/material/dialog';
import { AddPersonalComponent } from './add/add-personal.component';
import { EditPersonalComponent } from './edit/edit-personal.component';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {

  personal: Personal[] = [];

  desde: number = 0;

  totalRegistros: number = 0;

  displayedColumns: string[] = ['nombres', 'apellidos', 'identificacion', 'cargo', 'especialidad', 'icono1', 'icono2'];

  constructor(private _personalService: PersonalService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.cargarPersonal();
  }

  cargarPersonal() {
    this._personalService.cargarPersonal()
      .subscribe( (resp: any) => {
        this.totalRegistros = resp.total;
        this.personal = resp;
      });
  }

  cambiarDesde(valor: number) {
    const desde = this.desde + valor;

    if (desde >= this.totalRegistros) {
      return;
    }

    this.desde += valor;
    this.cargarPersonal();
  }

  buscarPersonal(termino: string) {
    if (termino.length <= 0) {
      this.cargarPersonal();
      return;
    }

    this._personalService.buscarPersonal(termino)
      .subscribe( (personal: Personal[]) => {
        this.personal = personal;
      });
  }

  addPersonal() {
    const dialogRef = this.dialog.open(AddPersonalComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.cargarPersonal();
    });
  }

  editPersonal(id: number) {
    const dialogRef = this.dialog.open(EditPersonalComponent, {
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      this.cargarPersonal();
    });
  }

  borrarPersonal(id: number) {}

}
