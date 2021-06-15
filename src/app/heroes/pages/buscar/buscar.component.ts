import { ElementSchemaRegistry } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import {} from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators';
import { Hero } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';


@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {


  sugerenciaHero: string
  termino: string = "";
  heroes: Hero[]=[];
  heroSelecionado: Hero;

  constructor(
    private fb: FormBuilder,
    private herosServices:HeroesService
  ) { }



  buscarFromGroup: FormGroup = this.fb.group({
    buscarCtrl: []
  })



  ngOnInit(): void {




    this.buscarFromGroup
            .get("buscarCtrl")
            ?.valueChanges.pipe(
                tap((_) => {
                  this.termino = this.buscarFromGroup
                  .get("buscarCtrl").value;
                })
            )
            .subscribe(
                () => {
                },
                (error) => {

                }
            );





  }
  buscando(){
this.herosServices
.getSugerencias(this.termino).subscribe(heroes =>
  this.heroes = heroes

  )

}

opcionSelecionada(event: any){

//TODO
if(!event.option.value){
  this.heroSelecionado = undefined
  return;

}


  const heroe: Hero = event.option.value;
  this.termino = heroe.superhero;
  this.buscarFromGroup.get("buscarCtrl").setValue(this.termino)
  this.herosServices.getHeroById(heroe.id)
  .subscribe(hero => this.heroSelecionado = heroe)




}



}
