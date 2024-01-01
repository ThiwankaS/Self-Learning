import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'

export const getNotes = () => axios.get(baseUrl).then(res => res.data)
export const createNotes = (newNote) => axios.post(baseUrl,newNote)
export const updateNotes = (updatedNote) => axios.put(`${baseUrl}/${updatedNote.id}`,updatedNote)