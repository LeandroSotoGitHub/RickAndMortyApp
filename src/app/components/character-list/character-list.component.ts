import { Component } from '@angular/core';
import { RickMortyService } from '../../Services/rick-morty.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent {
  characters: any[] = []
  searchResults: any[] = [] // Resultados de búsqueda
  searchMode: boolean = false // Indica si estamos en modo búsqueda
  next: string | null = null
  prev: string | null = null
  currentPage: number = 1
  totalPages: number = 1

  constructor(private RickMortyService: RickMortyService){}
  
  ngOnInit(): void {
    this.loadCharacters()
  }
  
  loadCharacters(page: number = 1): void {
    this.RickMortyService.getCharacters(page).subscribe( (data:any) => {
      this.characters = data.results;
      this.next = data.info.next;
      this.prev = data.info.prev;
      this.totalPages = data.info.pages;
      this.currentPage = page;
    });
  }

  updateCharacterList(characters: any[]): void {
    this.characters = characters;
  }
}
