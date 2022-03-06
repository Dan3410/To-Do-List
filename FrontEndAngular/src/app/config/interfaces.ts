export interface Response {
    status: string,
    message: string,
    data: any[] | any
  }

export interface Folder{
  id: Number,
  title: String,
  createdAt: any;
  updatedAt: any;
}

export interface ToDos{
  id: Number;
  title: String;
  description: String;
  createdAt: any;
  updatedAt: any;
  marked: Boolean;
}

export interface FolderToAdd{
  title: String
}

export interface ToDoToAdd{
  title: String,
  description: String,
  folderId: Number
}