import { Component, OnInit, Inject } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientesService } from '../../../services/clientes/clientes.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cliente } from '@src/app/models/cliente.model';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styles: [`
    button {
      margin: auto;
      display: block;
    }
  `
  ]
})
export class EditClienteComponent implements OnInit {

  public forma: FormGroup;
  matcher = new MyErrorStateMatcher();
  clienteId: any;
  cliente: any;

  constructor(public _servicioCliente: ClientesService,
              private _formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<EditClienteComponent>,
              @Inject(MAT_DIALOG_DATA) public id: Cliente) {
                this.clienteId = id;
                if (this.clienteId) {
                  // vamos a editar
                  this.getClienteId(this.clienteId);
                } else {
                  // vamos a agregrar
                }
              }

  ngOnInit(): void {
    this.forma = this._formBuilder.group({
      identificacion: [ '', [Validators.required]],
      nombres: [ '', [Validators.required]],
      apellidos: [ '', [Validators.required]],
      email: [ '', [Validators.required]],
      telefono: [ '', [Validators.required]],
      direccion: ['', [Validators.required]]
    });
  }

  getClienteId( clienteId: any) {
    this._servicioCliente.getCliente(clienteId).subscribe(
      result => {
        if ( result.ok) {
        this.cliente = result.cliente;
        this.forma.patchValue(this.cliente);
        }
      }
    );
  }

  actualizarDB(data: Cliente, id: number) {
    this._servicioCliente.actualizarCliente(data, id)
      .subscribe();
  }

  actualizarServicio() {
    const dataForm = this.forma.value;
    this.actualizarDB(dataForm, this.clienteId);
  }

}
