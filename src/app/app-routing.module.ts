import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterListComponent } from '../app/pages/main/character-list/character-list.component';
import { CharacterDetailComponent } from './pages/main/character-detail/character-detail.component';
import { Error404Component } from './pages/error404/error404.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: "", 
    loadChildren: () => import('../app/pages/main/main.module').then (m => m.MainModule),
    canActivate: [AuthGuard]
  },
  {
    path: "login", 
    loadChildren: () => import('../app/pages/auth/auth.module').then (m => m.AuthModule)
  },

  
  { path: '404', component: Error404Component },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
