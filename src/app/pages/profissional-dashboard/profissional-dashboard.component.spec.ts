import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfissionalDashboardComponent } from './profissional-dashboard.component';

describe('ProfissionalDashboardComponent', () => {
  let component: ProfissionalDashboardComponent;
  let fixture: ComponentFixture<ProfissionalDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfissionalDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfissionalDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
