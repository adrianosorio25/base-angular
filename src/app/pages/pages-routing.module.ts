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
import { PerfilComponent } from '@pages/perfil/perfil.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [VerificaTokenGuard],
    data: { titulo: 'Dashboard'}
  },
  { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador'} },
  { path: 'profile', component: PerfilComponent, data: { titulo: 'Perfil'} },
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
