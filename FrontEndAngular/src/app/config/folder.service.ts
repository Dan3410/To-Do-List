import { Injectable } from '@angular/core';
import { Folder } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class FolderService {
  folder: Folder = {id: NaN, title: "", createdAt: "", updatedAt: ""}
  constructor() { }

  getFolder(): Folder {
    return this.folder
  }
  setFolder(folder: Folder): void {
    
    this.folder = folder
  }

}
