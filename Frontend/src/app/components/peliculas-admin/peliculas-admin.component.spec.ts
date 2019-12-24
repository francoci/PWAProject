import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeliculasAdminComponent } from './peliculas-admin.component';

describe('PeliculasAdminComponent', () => {
  let component: PeliculasAdminComponent;
  let fixture: ComponentFixture<PeliculasAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeliculasAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeliculasAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
