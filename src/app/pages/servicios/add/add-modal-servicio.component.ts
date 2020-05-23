import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, Validators } from '@angular/forms';
import { ServiciosService } from '@services/service.index';
import { Servicio } from '@app/models/servicios.model';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-modal-servicio',
  templateUrl: './add-modal-servicio.component.html',
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
export class AddModalServicioComponent implements OnInit {

  forma: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(private _servicioService: ServiciosService) { }

  ngOnInit(): void {
    this.forma = new FormGroup({
      nombre: new FormControl( null, Validators.required ),
      descripcion: new FormControl( null, Validators.required )
    });
  }

  public registrarServicio(): void {

    if ( this.forma.invalid ) {
      return;
    }

    console.log('Forma Valida', this.forma.valid );
    console.log( this.forma.value );

    const servicio  = new Servicio(
      this.forma.value.nombre,
      this.forma.value.descripcion
    );

    this._servicioService.crearServicio( servicio )
        .subscribe();
  }

}
