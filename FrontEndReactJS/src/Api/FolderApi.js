import axios from "axios";
const baseURL = "http://localhost:8080/folder/";

export async function getAllFolders() {
  try {
    const response = await axios.get(baseURL);
    console.log(response);
    return { status: response.status, folders: response.data.data };
  } catch (error) {
    return { status: error.response.status, folders: null };
  }
}

export async function deleteFolder(id) {
  try {
    const response = await axios.delete(baseURL + id);
    return { status: response.status};
  } catch (error) {
    return { status: error.response.status};
  }
}

export async function addFolder(newFolder) {
  const response = await axios.post(baseURL, {
    title: newFolder.title.trim(),
  });
  return { status: response.status, folder: response.data.data };
}
