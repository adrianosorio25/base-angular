import { Component, OnInit, Inject } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Especie } from '@src/app/models/especie.model';
import { EspecieService } from '@services/service.index';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-edit-especie',
  templateUrl: './edit-especie.component.html',
  styles: [`
    button {
      margin: auto;
      display: block;
    }
  `
  ]
})
export class EditEspecieComponent implements OnInit {

  public forma: FormGroup;
  matcher = new MyErrorStateMatcher();
  especieId: any;
  especie: any;

  constructor(private _servicioEspecie: EspecieService,
              private _formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<EditEspecieComponent>,
              @Inject(MAT_DIALOG_DATA) public id: Especie) {
                this.especieId = id;
                if (this.especieId) {
                  // vamos a editar
                  this.getEspecieId(this.especieId);
                } else {
                  // vamos a agregrar
                }
              }

  ngOnInit(): void {
    this.forma = this._formBuilder.group({
      especie: [ '', [Validators.required]]
    });
  }

  getEspecieId( especieId: any) {
    this._servicioEspecie.cargarEspecieId(especieId).subscribe(
      result => {
        if ( result.ok) {
        this.especie = result.especie;
        this.forma.patchValue(this.especie);
        }
      }
    );
  }

  actualizarDB(data: Especie, id: number) {
    this._servicioEspecie.actualizarEspecie(data, id)
      .subscribe();
  }

  actualizarEspecie() {
    const dataForm = this.forma.value;
    this.actualizarDB(dataForm, this.especieId);
  }

}
