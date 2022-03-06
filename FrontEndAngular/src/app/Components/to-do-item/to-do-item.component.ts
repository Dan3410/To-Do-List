import { Component, Input, OnInit } from '@angular/core';
import { faTimesCircle, faPen } from '@fortawesome/free-solid-svg-icons';
import { FolderService } from 'src/app/config/folder.service';
import { ToDos } from 'src/app/config/interfaces';
import { ToDoApiService } from 'src/app/config/to-do-api.service';
import { ToDosService } from 'src/app/config/to-dos.service';

@Component({
  selector: 'app-to-do-item',
  templateUrl: './to-do-item.component.html',
  styleUrls: ['./to-do-item.component.scss']
})
export class ToDoItemComponent implements OnInit {
  faTimesCircle = faTimesCircle;
  faPen = faPen;
  folderId: Number = NaN;
  notDeleted: Boolean = true;
  @Input() toDo!: ToDos
  
  constructor(private folderService: FolderService,
    private toDoApiService: ToDoApiService,
    private toDoService: ToDosService) { }
    
  updateToDo() {
    this.toDoApiService.updateToDo(this.toDo.id, 
    this.toDo.title,
    this.toDo.description,
    this.toDo.marked,
    this.folderId)
  }

  setToDoInService(){
    this.toDoService.setToDo(this.toDo);
  }
  deleteToDo(){
    this.toDoApiService.deleteToDo(this.toDo.id)
    this.notDeleted = false;
  }
  ngOnInit(): void {
    this.folderId = this.folderService.getFolder().id;
  }
}
