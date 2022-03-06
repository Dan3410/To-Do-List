import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Response, ToDoToAdd } from './interfaces';

const baseURL = "http://localhost:8080/toDo/"

@Injectable({
  providedIn: 'root'
})
export class ToDoApiService {
  toDoResponse: Response | undefined;

  constructor(private http: HttpClient) { }
  getToDosFromFolder(folderId: Number) {
    return this.http.get<Response>(baseURL + folderId).toPromise();
  }

  createToDo(newToDo: ToDoToAdd) {
    return this.http.post<Response>(baseURL,
      {title: newToDo.title,
      description: newToDo.description,
      FolderId: newToDo.folderId}).toPromise();
  }

  deleteToDo(toDoId: Number) {
    return this.http.delete<Response>(baseURL + toDoId).toPromise()
  }

  updateToDo(toDoId: Number, toDoTitle: String, toDoDescription: String, marked: Boolean, folderId: Number) {
    return this.http.put<Response>(baseURL + toDoId,
      {
        title: toDoTitle.trim(),
        description: toDoDescription.trim(),
        marked: marked,
        folderId: folderId
      }).toPromise()
  }
}
