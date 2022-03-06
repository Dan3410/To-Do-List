import { Injectable } from '@angular/core';
import { ToDos } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class ToDosService {
  toDo: ToDos = { id: NaN, title: "", description: "", marked: false,
   createdAt: "", updatedAt: "" }
  constructor() { }
  setToDo(toDo: ToDos){
    this.toDo = toDo;
  }
  getToDo(){
    return this.toDo;
  }
}
