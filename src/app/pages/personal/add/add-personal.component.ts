import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { Personal } from '@src/app/models/personal.model';
import { PersonalService } from '@services/service.index';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-personal',
  templateUrl: './add-personal.component.html',
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
export class AddPersonalComponent implements OnInit {

  forma: FormGroup;
  matcher = new MyErrorStateMatcher();
  personal: Personal[] = [];

  constructor(private _personalService: PersonalService) {}

  ngOnInit(): void {
    this.forma = new FormGroup({
      nombres: new FormControl( null, Validators.required ),
      apellidos: new FormControl( null, Validators.required ),
      identificacion: new FormControl( null, Validators.required ),
      cargo: new FormControl( null, Validators.required ),
      especialidad: new FormControl( null, Validators.required )
    });
  }

  registrarPersonal(): void {

    if ( this.forma.invalid ) {
      return;
    }

    const personal = this.forma.value;

    this._personalService.crearPersonal( personal )
        .subscribe();
  }

}
