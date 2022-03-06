import { Component, OnInit } from '@angular/core';
import { FolderService } from 'src/app/config/folder.service';
import { ToDos } from 'src/app/config/interfaces';
import { ToDoApiService } from 'src/app/config/to-do-api.service';
import { ToDosService } from 'src/app/config/to-dos.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  toDo: ToDos = {
    id: NaN, title: "", description: "", marked: false,
    updatedAt: "", createdAt: ""
  }
  folderId: Number = NaN;
  constructor(private toDoService: ToDosService,
      private folderService: FolderService,
      private toDoApiService: ToDoApiService,
      private location: Location) { }

  returnPreviousPage(){
    this.location.back()
  }
  updateToDo() {
    console.log(this.toDo);
    //It has to update the ToDo in the Service
    this.toDoApiService.updateToDo(this.toDo.id, 
    this.toDo.title,
    this.toDo.description,
    this.toDo.marked,
    this.folderId)
    this.returnPreviousPage();
  }

  ngOnInit(): void {
    this.toDo = this.toDoService.getToDo();
    this.folderId = this.folderService.getFolder().id;
  }

}
