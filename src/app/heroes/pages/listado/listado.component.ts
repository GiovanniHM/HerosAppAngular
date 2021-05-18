import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css'],
})
export class ListadoComponent implements OnInit {
  constructor(private heroesService: HeroesService) {}

   heroes: Hero[] = [];

  ngOnInit(): void {
    this.heroesService.getHero().subscribe((resp) => {
      this.heroes = resp;
    });
  }
}
