import { Component, OnInit, Inject } from '@angular/core';
import { PersonalService } from '@services/service.index';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Personal } from '@src/app/models/personal.model';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit-personal',
  templateUrl: './edit-personal.component.html',
  styles: [
  ]
})
export class EditPersonalComponent implements OnInit {

  public forma: FormGroup;
  matcher = new MyErrorStateMatcher();
  personalId: any;
  personal: Personal[] = [];

  constructor(private _personalService: PersonalService,
              private _formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<EditPersonalComponent>,
              @Inject(MAT_DIALOG_DATA) public id: Personal) {
                this.personalId = id;
                if (this.personalId) {
                  // vamos a editar
                  this.editarPersonal(this.personalId);
                } else {
                  // vamos a agregrar
                }
              }

  ngOnInit(): void {
    this.forma = this._formBuilder.group({
      nombres: [ '', [Validators.required]],
      apellidos: [ '', [Validators.required]],
      identificacion: [ '', [Validators.required]],
      cargo: [ '', [Validators.required]],
      especialidad: [ '', [Validators.required]]
    });
  }

  editarPersonal( personalId: any) {
    this._personalService.cargarPersonalId(personalId).subscribe(
      result => {
        if ( result.ok) {
        this.personal = result.personal;
        this.forma.patchValue(this.personal);
        }
      }
    );
  }

  actualizarDB(data: Personal, id: number) {
    this._personalService.actualizarPersonal(data, id)
      .subscribe();
  }

  actualizarPersonal() {
    const dataForm = this.forma.value;
    this.actualizarDB(dataForm, this.personalId);
  }

}
