export function toDoTitleNotEmpty(title) {
  if (title === "") throw new Error("The title field cannot be empty");
}

export function toDoDescriptionNotEmpty(description) {
  if (description === "")
    throw new Error("The description field cannot be empty");
}

export function toDoAlreadyExists(title, toDoList){
    const indexWithSameTitle = toDoList
    .map((toDo) => toDo.title)
    .indexOf(title);
  if (indexWithSameTitle !== -1)
    throw new Error("There is already a ToDo with that title");

}
