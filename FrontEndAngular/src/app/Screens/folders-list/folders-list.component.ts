import { Component, OnInit } from '@angular/core';
import { FoldersApiService } from '../../config/folders-api.service';
import { LoginService } from 'src/app/config/login.service';
import { Folder, FolderToAdd, Response } from '../../config/interfaces';
import { folderTitleNotEmpty, folderAlreadyExists } from '../../Utils/CheckFolder'


@Component({
  selector: 'app-folders-list',
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss']
})
export class FoldersListComponent implements OnInit {

  constructor(private foldersApiService: FoldersApiService,
    private loginService: LoginService) {
    this.loginService.isLoggedIn.subscribe(logged => this.changeLoggedIn(logged))
  }

  folders: Folder[] = [];
  newFolder: FolderToAdd = { title: "" };
  errorMessage: string = "";
  isLoggedIn: boolean = false;


  async createFolder() {
    try {
      this.newFolder.title = this.newFolder.title.trim()
      folderTitleNotEmpty(this.newFolder.title);
      folderAlreadyExists(this.newFolder.title, this.folders);
      let response: Response = await this.foldersApiService.createFolder(this.newFolder)
      if (response.status === "Error") throw response.message
      this.folders?.push(response.data)
    }
    catch (error: any) {
      this.errorMessage = error
    }
    finally {
      this.newFolder = { title: "" }
    }
  }

  async getFolders() {
    try {
      let response: Response = await this.foldersApiService.getFolders()
      if (response.status === "Error") {
        throw ("Error retrieving Folders")
      }
      this.folders = response.data;
    } catch (error: any) {
      this.errorMessage = error
    }

  }

  private changeLoggedIn(isLoggedIn: boolean): void {
    this.isLoggedIn = isLoggedIn;
  }


  ngOnInit(): void {
    this.getFolders();
    this.loginService.getIsLoggedIn();
  }
}
