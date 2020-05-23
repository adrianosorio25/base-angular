// Modulos
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Guards
import { VerificaTokenGuard } from '@services/service.index';
import { AdminGuard } from '@services/guards/admin.guard';

// Componentes
import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { BusquedaComponent } from '@pages/busqueda/busqueda.component';
import { MantenimientoUsuariosComponent } from '@pages/mantenimiento-usuarios/mantenimiento-usuarios.component';
import { ServiciosComponent } from '@pages/servicios/servicios.component';
import { ClientesComponent } from '@pages/clientes/clientes.component';
import { EspeciesComponent } from '@pages/especies/especies.component';
import { RazaComponent } from './raza/raza.component';
import { PersonalComponent } from './personal/personal.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [VerificaTokenGuard],
    data: { titulo: 'Dashboard'}
  },
  { path: 'services', component: ServiciosComponent, data: { titulo: 'Servicios'} },
  { path: 'clients', component: ClientesComponent, data: { titulo: 'Clientes'} },
  { path: 'species', component: EspeciesComponent, data: { titulo: 'Especies'} },
  { path: 'races', component: RazaComponent, data: { titulo: 'Razas'} },
  { path: 'personal', component: PersonalComponent, data: { titulo: 'Personal'} },
  { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador'} },
  // mantenimiento
  {
    path: 'users-setting',
    component: MantenimientoUsuariosComponent,
    canActivate: [ AdminGuard ],
    data: { titulo: 'Mantenimiento De Usuarios'}
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
