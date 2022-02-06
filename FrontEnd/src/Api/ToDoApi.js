import axios from 'axios'
const baseURL = "http://localhost:8080/"

export async function getAllToDos(){
    const response = await axios.get(baseURL )
    return response.data;
}

export async function updateToDoInfo(id, title, description,marked){
    console.log(id)
    console.log(title)
    console.log(description)
    console.log(marked)
    const response = await axios.put(
        baseURL + id,
        {
            title: title,
            description: description,
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
        title: newToDo.title,
        description: newToDo.description
    })
    return await response.data
}