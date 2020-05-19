import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as screenfull from 'screenfull';
import { Router } from '@angular/router';
import { UsuarioService } from '@services/service.index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  admin: any;

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  private get screenfull(): screenfull.Screenfull {
    return screenfull as screenfull.Screenfull;
  }

  constructor(private router: Router, private _usuarioService: UsuarioService) {
    this.admin = this._usuarioService.usuario.role === 'ADMIN_ROLE';
  }

  ngOnInit(): void {}

  buscar( termino: string ) {
    this.router.navigate(['/busqueda', termino]);
  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

  // TODO:
  toggleFullscreen() {
    if (this.screenfull.isEnabled) {
      this.screenfull.toggle();
    }
  }

}
