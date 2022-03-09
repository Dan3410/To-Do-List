import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { FoldersApiService } from '../../config/folders-api.service';
import { LoginService } from 'src/app/config/login.service';
import { Folder, FolderToAdd, Response } from '../../config/interfaces';


@Component({
  selector: 'app-folders-list',
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss']
})
export class FoldersListComponent implements OnInit {

  constructor(private foldersApiService: FoldersApiService,
    private loginService: LoginService ) {
      this.loginService.isLoggedIn.subscribe(logged => this.changeLoggedIn(logged))
  }

  folders: Folder[] | undefined;
  newFolder: FolderToAdd = { title: "" };
  errorMessage: string = "";
  isLoggedIn: boolean = false;


  async createFolder() {
    try {
      this.newFolder.title = this.newFolder.title.trim()
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
    let response: Response = await this.foldersApiService.getFolders()
    if (response.status === "Error") {
      //Revisar porque no catchea el error la funcion padre
      console.log("Error")
      throw ("Error retrieving Folders")
    }
    this.folders = response.data;
    console.log(this.folders)
  }

  private changeLoggedIn(isLoggedIn : boolean): void{
    this.isLoggedIn = isLoggedIn;
  }


  ngOnInit(): void {
    try {
      this.getFolders();
      this.loginService.getIsLoggedIn();
    } catch (error: any) {
      this.errorMessage = error
    }
  }
}
