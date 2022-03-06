import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Screens/login/login.component';
import { ToDosListComponent } from './Screens/to-dos-list/to-dos-list.component';
import { EditComponent } from './Screens/edit/edit.component';
import { FoldersListComponent } from './Screens/folders-list/folders-list.component';
import { FolderItemComponent } from './Components/folder-item/folder-item.component';
import { ToDoItemComponent } from './Components/to-do-item/to-do-item.component';
import { HeaderComponent } from './Components/header/header.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ToDosListComponent,
    EditComponent,
    FoldersListComponent,
    FolderItemComponent,
    ToDoItemComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
