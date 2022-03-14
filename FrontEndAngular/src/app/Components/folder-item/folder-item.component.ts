import { Component, Input, OnInit } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Folder } from 'src/app/config/interfaces';
import { FoldersApiService } from 'src/app/config/folders-api.service';
import { FolderService } from 'src/app/config/folder.service';

@Component({
  selector: 'app-folder-item',
  templateUrl: './folder-item.component.html',
  styleUrls: ['./folder-item.component.scss']
})
export class FolderItemComponent implements OnInit {

  faTrash = faTrash
  @Input() folder!: Folder
  notDeleted: Boolean = true

  constructor(private foldersApiService: FoldersApiService,
    private folderService: FolderService) { }

  deleteFolder() {
    this.foldersApiService.deleteFolder(this.folder.id).then((response: any) => {
      if (response.status === 200) this.notDeleted = false;
    })
  }

  setFolderInService() {
    this.folderService.setFolder(this.folder)
  }

  ngOnInit(): void {
  }

}
