import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterListComponent } from './character-list/character-list.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CharacterDetailComponent } from './character-detail/character-detail.component';

const routes: Routes = [
  {path: '', component: CharacterListComponent, canActivate: [AuthGuard]},
  { path: 'characters/:id', component: CharacterDetailComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
