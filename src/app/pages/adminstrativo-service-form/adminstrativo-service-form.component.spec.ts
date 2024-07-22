import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminstrativoServiceFormComponent } from './adminstrativo-service-form.component';

describe('AdminstrativoServiceFormComponent', () => {
  let component: AdminstrativoServiceFormComponent;
  let fixture: ComponentFixture<AdminstrativoServiceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminstrativoServiceFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminstrativoServiceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
