import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe-tarjeta-component',
  templateUrl: './heroe-tarjeta-component.component.html',
  styleUrls: ['./heroe-tarjeta-component.component.css']
})
export class HeroeTarjetaComponentComponent implements OnInit {


@Input()
heroe: Hero;

  constructor() { }

  ngOnInit(): void {
  }

}
