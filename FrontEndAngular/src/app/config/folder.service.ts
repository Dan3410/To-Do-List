import { Injectable } from '@angular/core';
import { Folder } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class FolderService {
  folder: Folder = { id: NaN, title: "", createdAt: "", updatedAt: "" }
  constructor() {
    this.folder.id = localStorage.getItem("idFolder") ?
      Number(localStorage.getItem("idFolder")) : NaN
    this.folder.title = localStorage.getItem("titleFolder") ?
      String(localStorage.getItem("titleFolder")) : "";
    this.folder.createdAt = localStorage.getItem("createdAtFolder") ?
      String(localStorage.getItem("createdAtFolder")) : "";
    this.folder.updatedAt = localStorage.getItem("updatedAtFolder") ?
      String(localStorage.getItem("updatedAtFolder")) : "";

  }

  getFolder(): Folder {
    return this.folder
  }
  setFolder(folder: Folder): void {
    this.folder = folder
    localStorage.setItem("idFolder", String(folder.id));
    localStorage.setItem("titleFolder", folder.title);
    localStorage.setItem("createdAtFolder", folder.createdAt);
    localStorage.setItem("updatedAtFolder", folder.updatedAt);
  }

}
