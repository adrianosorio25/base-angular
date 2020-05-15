// Modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modulos Personalizados
import { MaterialModule } from '@app/material.module';
import { SharedModule } from '@shared/shared.module';

// Pipe
import { PipesModule } from '@app/pipes/pipes.module';

// Ruta
import { PagesRoutingModule } from '@pages/pages-routing.module';

// Componentes
import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { BusquedaComponent } from '@pages/busqueda/busqueda.component';
import { MantenimientoUsuariosComponent } from '@pages/mantenimiento-usuarios/mantenimiento-usuarios.component';
import { PerfilComponent } from '@pages/perfil/perfil.component';
import { AddModalUsuarioComponent } from '@pages/mantenimiento-usuarios/add-modal-usuario.component';
import { EditModalUsuarioComponent } from './mantenimiento-usuarios/edit-modal-usuario.component';

@NgModule({
  declarations: [
    DashboardComponent,
    BusquedaComponent,
    MantenimientoUsuariosComponent,
    PerfilComponent,
    AddModalUsuarioComponent,
    EditModalUsuarioComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    FormsModule,
    PipesModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
