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
  infoMessage?: string
  @Output() emitInfoMessage = new EventEmitter<any>()

  
  constructor (
    private RickMortyService: RickMortyService,
    private fb: FormBuilder
  ){
    this.searchForm = this.fb.group({
      searcher: ['']
    })
  }

  searchCharactersByName() {
    const searchValue = this.searchForm.get('searcher')?.value 
    if (searchValue) {
      this.RickMortyService.getCharacters(1, searchValue).subscribe({
        next: (data: any) => {
          this.characterSearched = data.results;
          this.emitCharacterSearched.emit(this.characterSearched)
          console.log(this.characterSearched)
        },
        error: (error) => {
          console.error('Personaje no encontrado', error)
          this.characterSearched = []
          this.infoMessage = 'Este personaje no existe'
          this.emitInfoMessage.emit(this.infoMessage) 
          this.emitCharacterSearched.emit(this.characterSearched)
        }        
      });
    } else {
      window.location.reload()
    }
  } 
}
