import { Component, OnInit, Inject } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RazasService, EspecieService } from '@services/service.index';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Raza } from '@src/app/models/raza.model';
import { Especie } from '@src/app/models/especie.model';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit-raza',
  templateUrl: './edit-raza.component.html',
  styles: [`
    button {
      margin: auto;
      display: block;
    }
  `
  ]
})
export class EditRazaComponent implements OnInit {

  public forma: FormGroup;
  matcher = new MyErrorStateMatcher();
  razaId: any;
  raza: any;
  especies: Especie[] = [];

  constructor(public _servicioRaza: RazasService,
              public _especieService: EspecieService,
              private _formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<EditRazaComponent>,
              @Inject(MAT_DIALOG_DATA) public id: Raza) {
                this.razaId = id;
                if (this.razaId) {
                  // vamos a editar
                  this.cargaRazaId(this.razaId);
                } else {
                  // vamos a agregrar
                }
              }

  ngOnInit(): void {

    this._especieService.cargarEspecie()
      .subscribe( especies => {
        this.especies = especies;
      });

    this.forma = this._formBuilder.group({
      nombre: [ '', [Validators.required]],
      especie: [ '', [Validators.required]]
    });
  }

  cargaRazaId( razaId: any) {
    this._servicioRaza.cargarRazaId(razaId).subscribe(
      result => {
        if ( result.ok) {
        this.raza = result.raza;
        this.forma.patchValue(this.raza);
        }
      }
    );
  }

  actualizarDB(data: Raza, id: number) {
    this._servicioRaza.actualizarRaza(data, id)
      .subscribe();
  }

  actualizarRaza() {
    const dataForm = this.forma.value;
    this.actualizarDB(dataForm, this.razaId);
  }

}
