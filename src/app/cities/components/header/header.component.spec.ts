import { ViewportScroller } from '@angular/common';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  const viewportScrollerSpy = jasmine.createSpyObj<ViewportScroller>(
    'ViewportScroller',
    ['scrollToPosition']
  );
  let component: HeaderComponent = new HeaderComponent(viewportScrollerSpy);

  it('#Should component initialized', () => {
    expect(component).toBeTruthy();
  });

  describe('Test onScroll method', () => {
    it('#Should set headerFixed to true', () => {
      window.scrollY = 2;

      component.onScroll();

      const headerFixed = component.isHeaderFixed;

      expect(headerFixed).toBeTruthy();
    });

    it('#Should set headerFixed to false', () => {
      window.scrollY = 0;

      component.onScroll();

      const headerFixed = component.isHeaderFixed;

      expect(headerFixed).toBeFalsy();
    });
  });

  describe('Test onScrollToTop method', () => {
    it('#Should call scrollToPosition', () => {
      component.onScrollToTop();

      expect(viewportScrollerSpy.scrollToPosition).toHaveBeenCalled();
    });
  });
});
