import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharacterListComponent } from './pages/character-list/character-list.component';
import { CharacterDetailComponent } from './pages/character-detail/character-detail.component';
import { Error404Component } from './pages/error404/error404.component';
import { GenderPipe } from './pipes/gender.pipe';
import { StatusPipe } from './pipes/status.pipe';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { SearchCharactersByNameComponent } from './components/search-characters-by-name/search-characters-by-name.component';

@NgModule({
  declarations: [
    AppComponent,
    CharacterListComponent,
    CharacterDetailComponent,
    Error404Component,
    GenderPipe,
    StatusPipe,
    PaginatorComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    SearchCharactersByNameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
