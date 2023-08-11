import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [HeaderComponent, MenuComponent, LayoutComponent, LoginComponent],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [HeaderComponent],
})
export class CoreModule {}
