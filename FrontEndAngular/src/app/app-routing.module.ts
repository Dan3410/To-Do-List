import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Screens/login/login.component';
import { ToDosListComponent } from './Screens/to-dos-list/to-dos-list.component';
import { FoldersListComponent } from './Screens/folders-list/folders-list.component'
import { EditComponent } from './Screens/edit/edit.component';

const routes: Routes = [
  {path: 'toDos', component: FoldersListComponent},
  {path: 'toDos/folders/:folderTitle', component: ToDosListComponent},
  {path: 'toDos/edit/:id', component: EditComponent},
  {path: '', component: LoginComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
