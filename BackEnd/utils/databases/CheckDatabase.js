module.exports = {
  toDoAlreadyExists: function (title, id, toDoList) {
    const indexWithSameTitle = toDoList
      .map((toDo) => toDo.title)
      .indexOf(title);
    if (
      indexWithSameTitle !== -1 &&
      Number(toDoList[indexWithSameTitle].id) !== Number(id)
    )
      throw new Error("There is already a ToDo with that title");
  },
};
