import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CitiesModule } from './cities/cities.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CitiesModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CitiesModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
