import { Component, OnInit } from '@angular/core';
import { FoldersApiService } from '../../config/folders-api.service';
import { LoginService } from 'src/app/config/login.service';
import { Folder, folderResponse, FolderToAdd } from '../../config/interfaces';
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


  createFolder() {
    try {
      this.newFolder.title = this.newFolder.title.trim()
      folderTitleNotEmpty(this.newFolder.title);
      folderAlreadyExists(this.newFolder.title, this.folders);
      this.foldersApiService.createFolder(this.newFolder).then((response: any) => {
        if (response.status === 201) this.folders?.push(response.data)
        if (response.status === 500) this.errorMessage = "Error creating folder"
      }, () => this.errorMessage = "Error creating folder"
      )
    }
    catch (error: any) {
      this.errorMessage = error
    }
    finally {
      this.newFolder = { title: "" }
    }
  }

  async getFolders() {
    this.foldersApiService.getFolders().then((response: any) => {
      console.log(response)
      if (response.status === 500) {
        this.errorMessage = "Error retrieving Folders"
      }
      if (response.status === 200)
        this.folders = response.data;
    }, () => this.errorMessage = "Error retrieving Folders"
    )
  }

  private changeLoggedIn(isLoggedIn: boolean): void {
    this.isLoggedIn = isLoggedIn;
  }


  ngOnInit(): void {
    this.getFolders();
    this.loginService.getIsLoggedIn();
  }
}
