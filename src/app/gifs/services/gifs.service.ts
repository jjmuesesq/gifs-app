import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class GifsService {

    private _tagsHistory: string[] = [];
    constructor() { }

    // getter
    get tagsHistory(){
        return [...this._tagsHistory];
    }
    
    //organizar
    private organizeHistory(tag: string){
        tag = tag.toLowerCase(); //se maneja todo en minuscula
        if(this._tagsHistory.includes( tag )){
            this._tagsHistory = this._tagsHistory.filter( (oldTag ) => oldTag !== tag ); //retorna los elementos sin el tag que coincide ne la lista
        }

        this._tagsHistory.unshift(tag); //inserto el tag al inicio
        this._tagsHistory = this._tagsHistory.splice(0, 10); //mostrar solo 10 elementos
    }

    //añadir un tag al inicio del arreglo
    searchTag( tag: string ):void {
        if(tag.length === 0 ) return;
        this.organizeHistory(tag);
        console.log(this.tagsHistory);
    }
}