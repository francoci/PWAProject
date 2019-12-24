import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeliculasListAdminComponent } from './peliculas-list-admin.component';

describe('PeliculasListAdminComponent', () => {
  let component: PeliculasListAdminComponent;
  let fixture: ComponentFixture<PeliculasListAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeliculasListAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeliculasListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
