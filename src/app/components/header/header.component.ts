import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RickMortyService } from 'src/app/Services/rick-morty.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  loginData = JSON.parse(sessionStorage.getItem('loginData') || '{}');
  userName = this.loginData.user.name
  characterSearched?: []
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  searchForm: FormGroup
  @Output() emitCharacterSearched = new EventEmitter<any>()



  constructor (
    private router: Router, 
    private fb: FormBuilder
  ){
    this.searchForm = this.fb.group({
      searcher: ['']
    })
  }


  logout(){
    sessionStorage.removeItem('loginToken')
    this.router.navigate(['/login'])
  }


  reloadPage() {
    window.location.reload();
  }
}
