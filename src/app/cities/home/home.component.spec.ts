import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('#Should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('#Should render app-main-dashboard', () => {
    fixture.detectChanges();

    const appMainDashboardElement =
      fixture.nativeElement.querySelector('app-main-dashboard');
    expect(appMainDashboardElement).toBeTruthy();
  });
});
