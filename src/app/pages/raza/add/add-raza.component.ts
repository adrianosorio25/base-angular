import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, Validators } from '@angular/forms';
import { RazasService, EspecieService } from '@services/service.index';
import { Raza } from '@src/app/models/raza.model';
import { Especie } from '@src/app/models/especie.model';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-raza',
  templateUrl: './add-raza.component.html',
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
export class AddRazaComponent implements OnInit {

  razas: Raza[] = [];
  especies: Especie[] = [];

  forma: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(private _servicioRaza: RazasService, public _especieService: EspecieService) {}

  ngOnInit(): void {

    this._especieService.cargarEspecie()
      .subscribe( especies => {
        this.especies = especies;
      });

    this.forma = new FormGroup({
      nombre: new FormControl( null, Validators.required ),
      especie: new FormControl( null, Validators.required )
    });
  }

  public registrarRaza(): void {

    if ( this.forma.invalid ) {
      return;
    }

    console.log('Forma Valida', this.forma.valid );
    console.log( this.forma.value );

    const raza  = new Raza(
      this.forma.value.nombre,
      this.forma.value.especie
    );

    this._servicioRaza.crearRaza( raza )
        .subscribe();
  }

}
