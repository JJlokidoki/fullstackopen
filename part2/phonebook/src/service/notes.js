import axios from 'axios'

const baseURL = 'http://localhost:3001'

async function getAll() {
    try {
        const response = await axios.get(`${baseURL}/persons`)
        console.log("Succesfull getting")
        return response
    }
    catch {
        console.log('Getting went wrong.')
    }
}

async function createNew(data) {
    try{
        const response = await axios.post(`${baseURL}/persons`, data)
        console.log("Succesfull creation")
        return response
    }
    catch (error) {
        console.log('Creation went wrong. Response code:' + error.response)
    }
}

async function deleteNote(id) {
    try{
        const response = await axios.delete(`${baseURL}/persons/${id}`)
        console.log("Succesfull deleted id " + id)
        return response
    }
    catch (error) {
        console.log("Deletion went wrong")
    }
}

async function updateNote(id, data) {
    try{
        const response = await axios.put(`${baseURL}/persons/${id}`, data)
        console.log("Succesfull updated id " + id)
        return response
    }
    catch (error) {
        console.log("Deletion went wrong")
    }
}

const notes = {getAll, createNew, deleteNote, updateNote}

export default notes;