import { Component, OnInit } from '@angular/core';
import { Cliente } from '@src/app/models/cliente.model';
import { ClientesService } from '@services/service.index';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { EditClienteComponent } from './edit-cliente/edit-cliente.component';
import { AddClienteComponent } from './add-cliente/add-cliente.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [];

  desde: number = 0;

  totalRegistros: number = 0;

  displayedColumns: string[] = ['nombres', 'identificacion', 'contacto', 'icono1', 'icono2'];

  constructor(private _servicioCliente: ClientesService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes() {
    this._servicioCliente.cargarCliente(this.desde)
      .subscribe( (resp: any) => {
        console.log(resp);
        this.totalRegistros = resp.total;
        this.clientes = resp.clientes;
      });
  }

  addCliente() {
    const dialogRef = this.dialog.open(AddClienteComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.cargarClientes();
    });
  }

  editCliente(id: number) {
    console.log(id);
    const dialogRef = this.dialog.open(EditClienteComponent, {
      width: '23%',
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      this.cargarClientes();
    });
  }

  cambiarDesde(valor: number) {
    const desde = this.desde + valor;

    if (desde >= this.totalRegistros) {
      return;
    }

    this.desde += valor;
    this.cargarClientes();
  }

  buscarCliente(termino: string) {
    if (termino.length <= 0) {
      this.cargarClientes();
      return;
    }

    this._servicioCliente.buscarCliente(termino)
      .subscribe( (clientes: Cliente[]) => {
        this.clientes = clientes;
      });
  }

  borrarCliente(cliente: Cliente) {
    Swal.fire({
      title: '¿Esta Seguro?',
      text: 'Esta a punto de borrar a: ' + cliente.nombres,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar!'
    }).then((borrar) => {
      if (borrar.value) {
        this._servicioCliente.borrarCliente(cliente._id)
          .subscribe( resp => {
            this.cargarClientes();
          });
      }
    });
  }

}
