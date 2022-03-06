import axios from 'axios'
const baseURL = "http://localhost:8080/folder/"

export async function getAllFolders(){
    const response = await axios.get(baseURL )
    return response.data;
}

export async function deleteFolder(id){
    const response = await axios.delete(baseURL + id)
    return await response.data;
}

export async function addFolder(newFolder){
    const response = await axios.post(baseURL,{
        title: newFolder.title.trim(),
   })
    return await response.data
}