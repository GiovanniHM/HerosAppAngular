import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroeTarjetaComponentComponent } from './heroe-tarjeta-component.component';

describe('HeroeTarjetaComponentComponent', () => {
  let component: HeroeTarjetaComponentComponent;
  let fixture: ComponentFixture<HeroeTarjetaComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroeTarjetaComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroeTarjetaComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
