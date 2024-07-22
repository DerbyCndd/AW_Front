import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminstrativoDeleteProfessionalComponent } from './adminstrativo-delete-professional.component';

describe('AdminstrativoDeleteProfessionalComponent', () => {
  let component: AdminstrativoDeleteProfessionalComponent;
  let fixture: ComponentFixture<AdminstrativoDeleteProfessionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminstrativoDeleteProfessionalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminstrativoDeleteProfessionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
