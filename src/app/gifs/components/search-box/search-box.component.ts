import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector: 'gifs-search-box',
    template: `
        <h5>Buscar</h5>
        <input type="text" 
               class="form-control" 
               placeholder="Buscar gifs..."
               (keyup.enter)="searchTag(  )"
               #txtTagInput
        >
    `
})

export class SearchBoxComponent {
    @ViewChild( 'txtTagInput' ) // nos sirve para tomar una referencia local de un elemento html
    public tagInput!: ElementRef<HTMLInputElement>; //siempre va a estar ese valor.

    constructor() { }

    // searchTag( newTag: string){  forma 1 (keyup.enter)="searchTag( txtTagInput.value )
    //     console.log({ newTag });
    // }

    searchTag(){
        const newTag = this.tagInput.nativeElement.value;
        console.log({ newTag });
    }
}