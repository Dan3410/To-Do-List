import { Folder } from "../config/interfaces";

export function folderTitleNotEmpty(title: string): void{
    if (title === "") throw new Error("The title field cannot be empty");
  }
    
  export function folderAlreadyExists(title: string, folderList: Folder[]) : void{
      const indexWithSameTitle = folderList
      .map((folder) => folder.title)
      .indexOf(title);
    if (indexWithSameTitle !== -1)
      throw new Error("There is already a Folder with that title");
  
  }
  