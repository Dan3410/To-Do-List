import { Injectable } from '@angular/core';
import { ToDos } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class ToDosService {
  toDo: ToDos = {
    id: NaN, title: "", description: "", marked: false,
    createdAt: "", updatedAt: ""
  }
  constructor() {
    this.toDo.id = localStorage.getItem("idTodo") ?
      Number(localStorage.getItem("idTodo")) : NaN
    this.toDo.title = localStorage.getItem("titleToDo") ?
      String(localStorage.getItem("titleToDo")) : "";
    this.toDo.description = localStorage.getItem("descriptionToDo") ?
      String(localStorage.getItem("descriptionToDo")) : "";
    this.toDo.createdAt = localStorage.getItem("createdAtToDo") ?
      String(localStorage.getItem("createdAtToDo")) : "";
    this.toDo.updatedAt = localStorage.getItem("updatedAtToDo") ?
      String(localStorage.getItem("updatedAtToDo")) : "";
    this.toDo.marked = localStorage.getItem("markedToDo") ?
      Boolean(localStorage.getItem("markedToDo")) : false;
  }
  setToDo(toDo: ToDos) {
    this.toDo = toDo;
    localStorage.setItem("idToDo", String(toDo.id));
    localStorage.setItem("descriptionToDo", String(toDo.description));
    localStorage.setItem("titleToDo", toDo.title);
    localStorage.setItem("createdAtToDo", toDo.createdAt);
    localStorage.setItem("updatedAtToDo", toDo.updatedAt);
    localStorage.setItem("markedToDo", String(toDo.marked));

  }
  getToDo() {
    return this.toDo;

  }
}
