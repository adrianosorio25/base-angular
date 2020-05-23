import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, Validators } from '@angular/forms';
import { ClientesService } from '@services/service.index';
import { Cliente } from '@src/app/models/cliente.model';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-cliente',
  templateUrl: './add-cliente.component.html',
  styles: [`
    .text-danger {
      color: #f44336;
      font-size: 80%;
      margin-top: -0.5em;
      top: calc(100% - 1.7916666667em);
    }
    .btn {
      display: block;
      margin: auto;
      margin-top: 5px;
    }
    mat-form-field{
      width:300px;
    }
  `
  ]
})
export class AddClienteComponent implements OnInit {

  forma: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(private _servicioCliente: ClientesService) { }

  ngOnInit(): void {
    this.forma = new FormGroup({
      identificacion: new FormControl( null, Validators.required ),
      nombres: new FormControl( null, Validators.required ),
      apellidos: new FormControl( null, Validators.required ),
      email: new FormControl( null, Validators.required ),
      telefono: new FormControl( null, Validators.required ),
      direccion: new FormControl( null, Validators.required )
    });
  }

  public registrarCliente(): void {

    if ( this.forma.invalid ) {
      return;
    }

    console.log('Forma Valida', this.forma.valid );
    console.log( this.forma.value );

    const cliente  = new Cliente(
      this.forma.value.identificacion,
      this.forma.value.nombres,
      this.forma.value.apellidos,
      this.forma.value.email,
      this.forma.value.telefono,
      this.forma.value.direccion
    );

    this._servicioCliente.crearCliente( cliente )
        .subscribe();
  }

}
