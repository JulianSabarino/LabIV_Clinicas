import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainhComponent } from './mainh.component';

describe('MainhComponent', () => {
  let component: MainhComponent;
  let fixture: ComponentFixture<MainhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainhComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
