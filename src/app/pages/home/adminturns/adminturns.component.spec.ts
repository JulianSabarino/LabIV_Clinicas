import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminturnsComponent } from './adminturns.component';

describe('AdminturnsComponent', () => {
  let component: AdminturnsComponent;
  let fixture: ComponentFixture<AdminturnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminturnsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminturnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
