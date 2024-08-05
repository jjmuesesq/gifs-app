import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class GifsService {

    private _tagsHistory: string[] = [];
    constructor() { }

    // getter
    get tagsHistory(){
        return [...this._tagsHistory];
    }
    

    //añadir un tag al inicio del arreglo
    searchTag( tag: string ):void {
        this._tagsHistory.unshift(tag);
        console.log(this.tagsHistory);
    }
}