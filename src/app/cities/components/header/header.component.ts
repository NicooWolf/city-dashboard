import { Component, HostListener } from '@angular/core';
import { SelectedCountry } from '../../models/country.interface';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public selectedCountry?: SelectedCountry;
  public isHeaderFixed: boolean = false;

  @HostListener('window:scroll', ['event']) onScroll() {
    window.scrollY > 1
      ? (this.isHeaderFixed = true)
      : (this.isHeaderFixed = false);
  }

  constructor(private viewportScroller: ViewportScroller) {}

  onScrollToTop() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
