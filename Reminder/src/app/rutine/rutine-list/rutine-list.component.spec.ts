import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RutineListComponent } from './rutine-list.component';

describe('RutineListComponent', () => {
  let component: RutineListComponent;
  let fixture: ComponentFixture<RutineListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RutineListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RutineListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
