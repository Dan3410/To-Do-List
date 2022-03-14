import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { observable, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ToDoToAdd } from './interfaces';

const baseURL = "http://localhost:8080/toDo/"

@Injectable({
  providedIn: 'root'
})
export class ToDoApiService {
  toDoResponse: Response | undefined;

  constructor(private http: HttpClient) { }
  async getToDosFromFolder(folderId: Number) {
    const response: any = await this.http.get<Response>(baseURL + folderId, { observe: 'response' }).toPromise()
    return { status: response.status, data: response.body.data }

  }

  async createToDo(newToDo: ToDoToAdd) {
    const response: any = await this.http.post<Response>(baseURL,
      {
        title: newToDo.title,
        description: newToDo.description,
        FolderId: newToDo.folderId
      }, { observe: 'response' }).toPromise();
    return { status: response.status, data: response.body.data }
  }

  async deleteToDo(toDoId: Number) {
    const response: any = await this.http.delete<Response>(baseURL + toDoId, { observe: 'response' }).toPromise()
    return { status: response.status, data: response.body.data }
  }

  async updateToDo(toDoId: Number, toDoTitle: String, toDoDescription: String, marked: Boolean, folderId: Number) {
    const response: any = await this.http.put<Response>(baseURL + toDoId,
      {
        title: toDoTitle.trim(),
        description: toDoDescription.trim(),
        marked: marked,
        folderId: folderId
      }, { observe: 'response' }).toPromise()
    return { status: response.status, data: response.body.data }
  }

  async updateToDoMark(toDoId: Number, toDoTitle: String, toDoDescription: String, marked: Boolean, folderId: Number) {
    const response: any = await this.http.put<Response>(baseURL + "mark/" + toDoId,
      {
        title: toDoTitle.trim(),
        description: toDoDescription.trim(),
        marked: marked,
        folderId: folderId
      }, { observe: 'response' }).toPromise()
    return { status: response.status, data: response.body.data }
  }
}
