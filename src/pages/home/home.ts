import { Component } from '@angular/core';
import { Refresher, reorderArray } from 'ionic-angular';


import { ANIMALES } from '../../data/data.animales';
import { Animal } from '../../interfaces/animal.interface';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  animeles:Animal[] = [];
  audio = new Audio();
  audioTiempo: any;
  ordenando:boolean = false;

  constructor() {
    this.animeles = ANIMALES.slice(0);
  }

  reproducir(animal:Animal){

    this.pausar_audio(animal);

    if(animal.reproduciendo){
      animal.reproduciendo = false;
      return;
    }

    console.log(animal);

    this.audio.src = animal.audio;

    this.audio.load();
    this.audio.play();

    animal.reproduciendo = true;

    this.audioTiempo = setTimeout( () => {
      animal.reproduciendo = false;
    }, animal.duracion * 1000);

  }

  private pausar_audio(animalSel:Animal){
    clearTimeout(this.audioTiempo);
    this.audio.pause();
    this.audio.currentTime = 0;

    this.animeles.forEach(animal => {
       if(animal.nombre != animalSel.nombre){
         animal.reproduciendo = false;
       }
    });
  }

  borrar_animal(index:number){
    this.animeles.splice(index, 1);
  }

  recargar_animales(refresher:Refresher){
      console.log("Iniciando el refresh");

      setTimeout(() => {
        console.log("Termino el refresh");
        this.animeles = ANIMALES.slice(0);
        refresher.complete();
      }, 1500);
  }

  reordernar_animales( indices:any){
    console.log(indices);
    this.animeles = reorderArray(this.animeles, indices);
  }

}
