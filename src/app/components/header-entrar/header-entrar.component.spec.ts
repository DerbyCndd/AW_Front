import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderEntrarComponent } from './header-entrar.component';

describe('HeaderEntrarComponent', () => {
  let component: HeaderEntrarComponent;
  let fixture: ComponentFixture<HeaderEntrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderEntrarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderEntrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
