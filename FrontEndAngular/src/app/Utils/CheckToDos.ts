import { ToDos } from "../config/interfaces";

export function toDoTitleNotEmpty(title: string) {
  if (title === "") throw new Error("The title field cannot be empty");
}

export function toDoDescriptionNotEmpty(description: string) {
  if (description === "")
    throw new Error("The description field cannot be empty");
}

export function toDoAlreadyExists(title: string, toDoList: ToDos[]){
    const indexWithSameTitle = toDoList
    .map((toDo) => toDo.title)
    .indexOf(title);
  if (indexWithSameTitle !== -1)
    throw new Error("There is already a ToDo with that title");

}
