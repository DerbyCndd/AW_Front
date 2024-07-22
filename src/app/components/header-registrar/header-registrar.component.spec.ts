import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderRegistrarComponent } from './header-registrar.component';

describe('HeaderRegistrarComponent', () => {
  let component: HeaderRegistrarComponent;
  let fixture: ComponentFixture<HeaderRegistrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderRegistrarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
