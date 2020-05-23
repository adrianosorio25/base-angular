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
import { EditModalUsuarioComponent } from '@pages/mantenimiento-usuarios/edit-modal-usuario.component';
import { ServiciosComponent } from '@pages/servicios/servicios.component';
import { AddModalServicioComponent } from '@pages/servicios/add/add-modal-servicio.component';
import { EditModalServicioComponent } from '@pages/servicios/edit/edit-modal-servicio.component';
import { ClientesComponent } from '@pages/clientes/clientes.component';
import { EditClienteComponent } from '@pages/clientes/edit-cliente/edit-cliente.component';
import { AddClienteComponent } from '@pages/clientes/add-cliente/add-cliente.component';
import { EspeciesComponent } from '@pages/especies/especies.component';
import { AddEspecieComponent } from '@pages/especies/add/add-especie.component';
import { EditEspecieComponent } from '@pages/especies/edit/edit-especie.component';
import { RazaComponent } from './raza/raza.component';
import { AddRazaComponent } from './raza/add/add-raza.component';
import { EditRazaComponent } from './raza/edit/edit-raza.component';
import { PersonalComponent } from './personal/personal.component';
import { AddPersonalComponent } from './personal/add/add-personal.component';
import { EditPersonalComponent } from './personal/edit/edit-personal.component';

@NgModule({
  declarations: [
    DashboardComponent,
    BusquedaComponent,
    MantenimientoUsuariosComponent,
    PerfilComponent,
    AddModalUsuarioComponent,
    EditModalUsuarioComponent,
    ServiciosComponent,
    AddModalServicioComponent,
    EditModalServicioComponent,
    ClientesComponent,
    EditClienteComponent,
    AddClienteComponent,
    EspeciesComponent,
    AddEspecieComponent,
    EditEspecieComponent,
    RazaComponent,
    AddRazaComponent,
    EditRazaComponent,
    PersonalComponent,
    AddPersonalComponent,
    EditPersonalComponent
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
