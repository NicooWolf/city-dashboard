import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchDropdownComponent } from './components/search-dropdown/search-dropdown.component';
import { InfoCardComponent } from './components/info-card/info-card.component';
import { CelsiusPipe } from './pipes/celsius.pipe';
import { FormsModule } from '@angular/forms';
import { FahrenheitPipe } from './pipes/fahrenheit.pipe';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    SearchDropdownComponent,
    InfoCardComponent,
    CelsiusPipe,
    FahrenheitPipe,
    LoadingSpinnerComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [
    InfoCardComponent,
    SearchDropdownComponent,
    LoadingSpinnerComponent,
  ],
})
export class SharedModule {}
