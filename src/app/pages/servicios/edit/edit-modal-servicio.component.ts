import { Component, OnInit, Inject } from '@angular/core';
import { Servicio } from '@app/models/servicios.model';
import { ServiciosService } from '@services/service.index';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, FormGroupDirective, NgForm, FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit-modal-servicio',
  templateUrl: './edit-modal-servicio.component.html',
  styles: [`
    button {
      margin: auto;
      display: block;
    }
  `
  ]
})
export class EditModalServicioComponent implements OnInit {

  public forma: FormGroup;
  matcher = new MyErrorStateMatcher();
  servicioId: any;
  servicio: any;

  constructor(public _servicioService: ServiciosService,
              private _formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<EditModalServicioComponent>,
              @Inject(MAT_DIALOG_DATA) public id: Servicio) {
                this.servicioId = id;
                if (this.servicioId) {
                  // vamos a editar
                  this.getServicioId(this.servicioId);
                } else {
                  // vamos a agregrar
                }
  }

  ngOnInit(): void {
    this.forma = this._formBuilder.group({
      nombre: [ '', [Validators.required]],
      descripcion: ['', [Validators.required]]
    });
  }

  getServicioId( servicioId: any) {
    this._servicioService.cargarServicioId(servicioId).subscribe(
      result => {
        if ( result.ok) {
        this.servicio = result.servicio;
        this.forma.patchValue(this.servicio);
        }
      }
    );
  }

  actualizarDB(data: Servicio, id: number) {
    this._servicioService.actualizarServicio(data, id)
      .subscribe();
  }

  actualizarServicio() {
    const dataForm = this.forma.value;
    this.actualizarDB(dataForm, this.servicioId);
  }

}
