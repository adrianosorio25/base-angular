import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '@services/service.index';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    mat-drawer {
        width: 240px;
    }

    mat-drawer-container {
        height: 100%;
        display: block;
    }

    mat-drawer-content {
        height: 95.5%;
        padding: 16px;
    }

    .header {
        box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.3);
    }
  `
  ]
})
export class PagesComponent implements OnInit {

  sideBarOpen = true;

  constructor(public _usuarioService: UsuarioService) { }

  ngOnInit(): void {
  }

  sideBarToggler(event) {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
