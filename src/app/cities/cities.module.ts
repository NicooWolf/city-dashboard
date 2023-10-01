import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MainDashboardComponent } from './components/main-dashboard/main-dashboard.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HeaderComponent, MainDashboardComponent, HomeComponent],
  imports: [CommonModule, SharedModule],
  exports: [HomeComponent, HeaderComponent],
})
export class CitiesModule {}
