export interface folderResponse {
    status: number,
    data: any[] | any
  }

export interface Response {
  status: number,
  data: any[] | any

}

export interface Folder{
  id: number,
  title: string,
  createdAt: any;
  updatedAt: any;
}

export interface ToDos{
  id: Number;
  title: string;
  description: string;
  createdAt: any;
  updatedAt: any;
  marked: Boolean;
}

export interface FolderToAdd{
  title: string
}

export interface ToDoToAdd{
  title: string,
  description: string,
  folderId: number
}