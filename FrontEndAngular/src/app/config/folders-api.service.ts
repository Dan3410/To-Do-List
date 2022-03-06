import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { FolderToAdd, Response } from './interfaces';

const baseURL = "http://localhost:8080/folder/"

@Injectable({
  providedIn: 'root'
})
export class FoldersApiService {

  constructor(private http: HttpClient) { }
// None of this functions have a strict requirement to be declared as async
// It work both being declared async and using await and not
  getFolders() {
    return this.http.get<Response>(baseURL).toPromise()
  }
  createFolder(newFolder: FolderToAdd){
    return this.http.post<Response>(baseURL,newFolder).toPromise()
  }

  deleteFolder(id:Number){
    return this.http.delete<Response>(baseURL + id).toPromise()
  }
}
