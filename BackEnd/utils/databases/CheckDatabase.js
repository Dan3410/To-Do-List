module.exports = {
  toDoAlreadyExists: function (title, toDoList) {
    const indexWithSameTitle = toDoList
      .map((toDo) => toDo.title)
      .indexOf(title);
    if (indexWithSameTitle !== -1)
      throw new Error("There is already a ToDo with that title");
  },
};
