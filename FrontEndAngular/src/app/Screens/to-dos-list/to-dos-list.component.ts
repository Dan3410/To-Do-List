import { Component, Input, OnInit } from '@angular/core';
import { FolderService } from 'src/app/config/folder.service';
import { ToDoApiService } from 'src/app/config/to-do-api.service';
import { Folder, ToDos, ToDoToAdd } from 'src/app/config/interfaces';
import { toDoAlreadyExists, toDoDescriptionNotEmpty, toDoTitleNotEmpty } from 'src/app/Utils/CheckToDos';

@Component({
  selector: 'app-to-dos-list',
  templateUrl: './to-dos-list.component.html',
  styleUrls: ['./to-dos-list.component.scss']
})
export class ToDosListComponent implements OnInit {

  constructor(private folderService: FolderService,
    private toDosApiService: ToDoApiService) { }

  errorMessage: String = "";
  folder: Folder = { id: NaN, title: "", createdAt: "", updatedAt: "" };
  toDos: ToDos[] = [];
  newToDo: ToDoToAdd = { title: "", description: "", folderId: NaN };

  childrenErrorHandler(childError: string) {
    this.errorMessage = childError;
  }

  getToDos() {
    try {
      this.toDosApiService.getToDosFromFolder(this.folder.id).then((response) => {
        if (response.status === 200) { this.toDos = response.data }
        if (response.status === 500) this.errorMessage = "Error retrieving Folders"
      }, () => this.errorMessage = "Error retrieving Folders")
    } catch (error: any) {
      this.errorMessage = "Error retrieving ToDo"
    }
  }

  createToDos() {
    try {
      this.newToDo.title = this.newToDo.title.trim()
      this.newToDo.description = this.newToDo.description.trim()
      toDoTitleNotEmpty(this.newToDo.title)
      toDoDescriptionNotEmpty(this.newToDo.title)
      toDoAlreadyExists(this.newToDo.title, this.toDos)
      this.toDosApiService.createToDo(this.newToDo).then((response) => {
        if (response.status === 500) this.errorMessage = "Error creating ToDo"
        if (response.status === 201) { this.toDos.push(response.data); this.errorMessage = "" }
      }, () => this.errorMessage = "Error creating ToDo")
    }
    catch (error: any) {
      this.errorMessage = "Error creating ToDo"
    }
    finally {
      this.newToDo = { title: "", description: "", folderId: this.newToDo.folderId }
    }

  }

  ngOnInit(): void {
    try {
      this.folder = this.folderService.getFolder();
      this.getToDos()
      this.newToDo.folderId = this.folder.id
    } catch (error: any) {
      this.errorMessage = error;
    }
  }

}
