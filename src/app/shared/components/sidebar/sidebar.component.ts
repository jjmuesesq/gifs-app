import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

    //private gifsService
    constructor( private gifService: GifsService){}

    //geters
    get tags(): string[] {
      return this.gifService.tagsHistory;
    }

    searchTag (tag: string): void {
      this.gifService.searchTag(tag);
    }
}
