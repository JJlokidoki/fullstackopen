import axios from 'axios'

const baseURL = '/api'

async function getAll() {
    const response = await axios.get(`${baseURL}/persons`)
    console.log("Succesfull getting")
    return response
}

async function createNew(data) {
    const response = await axios.post(`${baseURL}/persons`, data)
    console.log("Succesfull creation")
    return response
}

async function deleteNote(id) {
    const response = await axios.delete(`${baseURL}/persons/${id}`)
    console.log("Succesfull deleted id " + id)
    return response
}

async function updateNote(id, data) {
    const response = await axios.put(`${baseURL}/persons/${id}`, data)
    console.log("Succesfull updated id " + id)
    return response
}

const notes = {getAll, createNew, deleteNote, updateNote}

export default notes;