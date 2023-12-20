import { createNote,toggleImportanceOf } from './reducers/noteReducer'
import { useSelector,useDispatch } from 'react-redux'

const App = () => {
    const dispatch = useDispatch()
    const note = useSelector(state => state)
    const addNote = (event) => {
        event.preventDefault()
        const content = event.target.note.value
        event.target.note.value =''
        dispatch(createNote(content))
    }
    const toggleImportance = (id) => {
        dispatch(toggleImportanceOf(id))
    }
    return (
    <div>
        <div>
        <form onSubmit={addNote}>
            <input name='note' />
            <button type='submit'>add</button>
        </form>
        </div>
        <div>
        <ul>
            {note.map(note => <li 
                                key={note.id} 
                                onClick={() => toggleImportance(note.id)}
                            >
                                {note.content} <strong>{note.important ? 'important' : ''}</strong>
                            </li>)}
        </ul>
        </div>
    </div>
    )
}
export default App