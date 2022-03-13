import axios from "axios";
const baseURL = "http://localhost:8080/toDo/";

export async function getAllToDosFromFolder(folderId) {
  try {
    const response = await axios.get(baseURL + `${folderId}`);
    return { status: response.status, toDos: response.data.data };
  } catch (error) {
    return { status: error.response.status, toDos: null };
  }
}

export async function updateToDoMark(id, marked) {
  try {
    const response = await axios.put(baseURL + "mark/" + id, {
      marked: marked,
    });
    return { status: response.status, toDo: response.data.data };
  } catch (error) {
    return { status: error.response.status, toDo: null };
  }
}

export async function updateToDoInfo(id, title, description, marked, folderId) {
  try {
    const response = await axios.put(baseURL + id, {
      title: title.trim(),
      description: description.trim(),
      marked: marked,
      folderId: folderId,
    });
    return { status: response.status, toDo: response.data.data };
  } catch (error) {
    return { status: error.response.status, toDo: null };
  }
}

export async function deleteToDo(id) {
  try {
    const response = await axios.delete(baseURL + id);
    return { status: response.status };
  } catch (error) {
    return { status: error.response.status };
  }
}

export async function addToDo(newToDo) {
  const response = await axios.post(baseURL, {
    title: newToDo.title.trim(),
    description: newToDo.description.trim(),
    FolderId: newToDo.folderId,
  });
  return { status: response.status, toDo: response.data.data };
}
