import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrativoServicoDelEditComponent } from './administrativo-servico-del-edit.component';

describe('AdministrativoServicoDelEditComponent', () => {
  let component: AdministrativoServicoDelEditComponent;
  let fixture: ComponentFixture<AdministrativoServicoDelEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministrativoServicoDelEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdministrativoServicoDelEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
