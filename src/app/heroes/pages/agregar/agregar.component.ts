import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css'],
})
export class AgregarComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private hs: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics',
    },
  ];

  heroDataFrom: FormGroup = this.fb.group({
    id: [''],
    superhero: ['', [Validators.required]],
    alter_ego: ['', [Validators.required]],
    characters: ['', [Validators.required]],
    first_appearance: ['', [Validators.required]],
    publisherControl: ['', [Validators.required]],
    alt_img: ['', [Validators.required]],
  });

  hero: Hero = {
    superhero: '',
    id: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',

  };

  addedHero() {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.hero.id = id,
      ));
    this.hero.superhero = this.heroDataFrom.get('superhero').value;
    this.hero.alter_ego = this.heroDataFrom.get('alter_ego').value;
    this.hero.characters = this.heroDataFrom.get('characters').value;
    this.hero.first_appearance =
      this.heroDataFrom.get('first_appearance').value;
    this.hero.publisher = this.heroDataFrom.get('publisherControl').value;
    this.hero.alt_img = this.heroDataFrom.get('alt_img').value;

    if (this.hero.id) {
      //Actualizar
      this.hs.actualizarHero(this.hero)
      .subscribe(hero => console.log('Actualizando', hero));
    } else {
      //Crear
      this.hs.agregarHero(this.hero)
      .subscribe(hero => {
        this.router.navigate(['/heroes/editar', hero.id])
      })
    };
  }

  borrar(){
    this.hs.borrarHero(this.hero.id)
    .subscribe(resp => {
      this.router.navigate(['/heroes'])
    } );
  }

  ngOnInit(): void {

    if(!this.router.url.includes('editar')){
    return;
    }
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.hs.getHeroById(id),

      ))
      .subscribe((heroe) => {
        this.hero = heroe
        this.heroDataFrom.controls['id'].setValue(heroe.id);
        this.heroDataFrom.controls['superhero'].setValue(heroe.superhero);
        this.heroDataFrom.controls['alter_ego'].setValue(heroe.alter_ego);
        this.heroDataFrom.controls['characters'].setValue(heroe.characters);
        this.heroDataFrom.controls['first_appearance'].setValue(
          heroe.first_appearance
        );
        this.heroDataFrom.controls['publisherControl'].setValue(
          heroe.publisher
        );
        this.heroDataFrom.controls['alt_img'].setValue(heroe.alt_img);
      });
  }
}
