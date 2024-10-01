import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RickMortyService } from 'src/app/Services/rick-morty.service';

@Component({
  selector: 'app-search-characters-by-name',
  templateUrl: './search-characters-by-name.component.html',
  styleUrls: ['./search-characters-by-name.component.css']
})
export class SearchCharactersByNameComponent {
  characterSearched?: []
  searchForm: FormGroup
  @Output() emitCharacterSearched = new EventEmitter<any>()

  
  constructor (
    private RickMortyService: RickMortyService,
    private fb: FormBuilder
  ){
    this.searchForm = this.fb.group({
      searcher: ['']
    })
  }
  searchCharactersByName() {
    const searchValue = this.searchForm.get('searcher')?.value; // Obtiene el valor del input
    if (searchValue) {
      this.RickMortyService.getCharactersByName(searchValue).subscribe({
        next: (data: any) => {
          this.characterSearched = data.results;
          this.emitCharacterSearched.emit(this.characterSearched);
          console.log(this.characterSearched)
        },
        error: (error) => {
          console.error('Personaje no encontrado', error);
          this.characterSearched = [];
          this.emitCharacterSearched.emit([]);
        }
      });
    }
  }
}
