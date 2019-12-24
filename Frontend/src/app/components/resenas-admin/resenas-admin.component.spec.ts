import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResenasAdminComponent } from './resenas-admin.component';

describe('ResenasAdminComponent', () => {
  let component: ResenasAdminComponent;
  let fixture: ComponentFixture<ResenasAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResenasAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResenasAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
