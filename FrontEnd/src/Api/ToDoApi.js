import axios from 'axios'
const baseURL = "http://localhost:8080/toDo/"

export async function getAllToDosFromFolder(folderId){
    const response = await axios.get(baseURL + `${folderId}`)
    return response.data;
}

export async function updateToDoInfo(id, title, description,marked){
    const response = await axios.put(
        baseURL + id,
        {
            title: title.trim(),
            description: description.trim(),
            marked: marked
        }
    )
    return await response.data;
}

export async function deleteToDo(id){
    const response = await axios.delete(baseURL + id)
    return await response.data;
}

export async function addToDo(newToDo){
    const response = await axios.post(baseURL,{
        title: newToDo.title.trim(),
        description: newToDo.description.trim(),
        FolderId: newToDo.folderId
    })
    return await response.data
}