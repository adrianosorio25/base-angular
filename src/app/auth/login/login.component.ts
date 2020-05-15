import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '@services/service.index';
import { Usuario } from '@app/models/usuario.model';
import { NgForm, FormControl, FormGroupDirective, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public forma: FormGroup;

  matcher = new MyErrorStateMatcher();

  auth2: any;

  email: string;

  recuerdame: boolean = false;

  hide = true;

  constructor(private router: Router, private _usuarioService: UsuarioService ) {}

  ngOnInit(): void {
    this.forma = new FormGroup({
      recuerdame: new FormControl(this.recuerdame),
      email: new FormControl( null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')] ),
      password: new FormControl( null, Validators.required )
    });

    this.googleInit();

    this.email = localStorage.getItem('email') || '';

    if ( this.email.length > 1) {
      this.recuerdame = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '643244066292-i77o6fnonqso62cmeidgg0v9vjp29n6g.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin( document.getElementById('btnGooglePlus'));

    });
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      // const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;

      this._usuarioService.loginGoogle(token)
        .subscribe( () => window.location.href = '#/dashboard');

    });
  }

  ingresar() {

    if ( this.forma.invalid ) {
      return;
    }

    const usuario = new Usuario( null, this.forma.value.email, this.forma.value.password);

    this._usuarioService.login( usuario, this.forma.value.recuerdame)
        .subscribe( correcto => this.router.navigate(['/dashboard']));
  }

}
