import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmProductosComponent } from './abm-productos.component';

describe('AbmProductosComponent', () => {
  let component: AbmProductosComponent;
  let fixture: ComponentFixture<AbmProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbmProductosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AbmProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
