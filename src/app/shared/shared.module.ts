// Modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modulos Personalizados
import { MaterialModule } from '@app/material.module';
import { PipesModule } from '@app/pipes/pipes.module';

// Componentes
import { NopagefoundComponent } from '@shared/nopagefound/nopagefound.component';
import { BreadcrumbsComponent } from '@shared/breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from '@shared/sidebar/sidebar.component';
import { HeaderComponent } from '@shared/header/header.component';
import { UserComponent } from '@shared/header/user.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    BreadcrumbsComponent,
    NopagefoundComponent,
    SidebarComponent,
    HeaderComponent,
    UserComponent
  ],
  exports: [
    BreadcrumbsComponent,
    NopagefoundComponent,
    SidebarComponent,
    HeaderComponent,
    UserComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    PipesModule,
    RouterModule
  ]
})
export class SharedModule { }
