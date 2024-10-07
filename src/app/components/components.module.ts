import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { SearchCharactersByNameComponent } from './search-characters-by-name/search-characters-by-name.component';
import { GenderPipe } from './pipes/gender.pipe';
import { StatusPipe } from './pipes/status.pipe';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HeaderComponent,
    PaginatorComponent,
    SearchCharactersByNameComponent,
    GenderPipe,
    StatusPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[
    HeaderComponent,
    PaginatorComponent,
    SearchCharactersByNameComponent,
    GenderPipe,
    StatusPipe
  ]
})
export class ComponentsModule { }
