import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, Validators } from '@angular/forms';
import { EspecieService } from '@services/service.index';
import { Especie } from '@src/app/models/especie.model';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-especie',
  templateUrl: './add-especie.component.html',
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
export class AddEspecieComponent implements OnInit {

  forma: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(private _servicioEspecie: EspecieService) { }

  ngOnInit(): void {
    this.forma = new FormGroup({
      especie: new FormControl( null, Validators.required )
    });
  }

  public registrarEspecie(): void {

    if ( this.forma.invalid ) {
      return;
    }

    console.log('Forma Valida', this.forma.valid );
    console.log( this.forma.value );

    const especie  = new Especie(
      this.forma.value.especie
    );

    this._servicioEspecie.crearEspecie( especie )
        .subscribe();
  }

}
