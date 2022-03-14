import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { FolderToAdd } from './interfaces';

const baseURL = "http://localhost:8080/folder/"

@Injectable({
  providedIn: 'root'
})
export class FoldersApiService {

  constructor(private http: HttpClient) { }
  // None of this functions have a strict requirement to be declared as async
  // It work both being declared async and using await and not
  async getFolders() {
    const response: any = await this.http.get(baseURL, { observe: "response" }).toPromise()
    return { status: response.status, data: response.body.data }
  }

  async createFolder(newFolder: FolderToAdd) {
    const response: any = await this.http.post<Response>(baseURL, newFolder, { observe: "response" }).toPromise()
    return { status: response.status, data: response.body.data}
  }

  async deleteFolder(id: Number) {
    const response: any = await this.http.delete<Response>(baseURL + id,{observe: 'response'}).toPromise()
    return { status: response.status, data: response.body.data}

  }
}
