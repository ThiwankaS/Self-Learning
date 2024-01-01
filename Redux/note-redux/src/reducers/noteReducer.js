import { createSlice } from '@reduxjs/toolkit'
import noteService from '../services/notes'

const noteSlice = createSlice({
    name : 'notes',
    initialState : [],
    reducers : {
        toggleImportanceOf (state,action) {
            const id = action.payload
            const noteToChange = state.find(note => note.id === id)
            const changedNote = { ...noteToChange, important : !noteToChange.important }
            return state.map(note => note.id !== id ? note : changedNote )
        },
        appendNote (state,action) {
          state.push(action.payload)
        },
        setNote (state,action) {
          return action.payload
        }
    }
})
  
export const { toggleImportanceOf,appendNote,setNote } = noteSlice.actions

export const intializeNotes = () => {
  return async dispatch => {
    const notes = await noteService.getAll()
    dispatch(setNote(notes))
  }
}

export const createNote = (content) => {
  return async dispatch => {
    const newNote = await noteService.createNew(content)
    const noteObj = {
      content : newNote.content,
      important : newNote.important,
      id : newNote.id
    }
    dispatch(appendNote(noteObj))
  }
}

export default noteSlice.reducer