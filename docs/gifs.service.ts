import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {

    public gifList: Gif[] = [];

    private _tagsHistory: string[] = [];
    private apiKey: string = 'FOkALThLY4yLDlS0XiThDK35iFt5YqbV';
    private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

    constructor( private http: HttpClient) { 
        this.loadLocalStorage();
        console.log('Gifs Service Ready');
    }

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
        this.saveLocalStorage();
    }

    private saveLocalStorage():void {
        localStorage.setItem('history', JSON.stringify(this._tagsHistory) );//convierte objeto en string
    }

    private loadLocalStorage():void {
        if( !localStorage.getItem('history') ) return;
        this._tagsHistory = JSON.parse(localStorage.getItem('history')!); //siempre viene una data con el operador no null

        if( this._tagsHistory.length === 0 ) return;
        this.searchTag(this._tagsHistory[0]);
    }


    //añadir un tag al inicio del arreglo
    searchTag( tag: string ): void {
        if(tag.length === 0 ) return;
        this.organizeHistory(tag);

        // consumo del api forma 3 http; no es una promesa sino un observable
        const params = new HttpParams()
            .set('api_key', this.apiKey)
            .set('limit', 10)
            .set('q', tag)

        this.http.get<SearchResponse>(`${ this.serviceUrl }/search`, { params })
            .subscribe( resp => {
                this.gifList = resp.data;
                // console.log({ gifs: this.gifList });
            });
    }
}



// async searchTag( tag: string ):Promise<void> {
//     if(tag.length === 0 ) return;
//     this.organizeHistory(tag);

    // consumo del api forma 1;
    // fetch('http://api.giphy.com/v1/gifs/search?api_key=FOkALThLY4yLDlS0XiThDK35iFt5YqbV&q=valorant&limit=10')
    //     .then(res => res.json())
    //     .then(data => console.log(data));

    // consumo del api forma 2;
    // const resp = await fetch('http://api.giphy.com/v1/gifs/search?api_key=FOkALThLY4yLDlS0XiThDK35iFt5YqbV&q=valorant&limit=10');
    // const data = await resp.json();
    // console.log(data);