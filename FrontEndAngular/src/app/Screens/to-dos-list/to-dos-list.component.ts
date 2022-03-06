import { Component, Input, OnInit } from '@angular/core';
import { FolderService } from 'src/app/config/folder.service';
import { ToDoApiService } from 'src/app/config/to-do-api.service';
import { Folder, ToDos, Response, ToDoToAdd } from 'src/app/config/interfaces';

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
  newToDo: ToDoToAdd = {title: "", description: "", folderId: NaN};

  async getToDos() { 
    let response: Response = await this.toDosApiService.getToDosFromFolder(this.folder.id)
    if (response.status === "Error") {
      //Revisar porque no catchea el error la funcion padre
      console.log("Error")
      throw ("Error retrieving Folders")
    }
    this.toDos = response.data;
  }

  async createToDos(){
    try {
      this.newToDo.title = this.newToDo.title.trim()
      this.newToDo.description = this.newToDo.description.trim()
      let response: Response = await this.toDosApiService.createToDo(this.newToDo)
      if (response.status === "Error") throw response.message
      this.toDos?.push(response.data)
    }
    catch (error: any) {
      this.errorMessage = error
    }
    finally {
      this.newToDo = { title: "", description: "", folderId: this.newToDo.folderId }
    }

  }

  ngOnInit(): void {
    try{
    this.folder = this.folderService.getFolder();
    this.getToDos()
    this.newToDo.folderId = this.folder.id
    }catch(error: any){
      this.errorMessage = error;
    }
  }

}
