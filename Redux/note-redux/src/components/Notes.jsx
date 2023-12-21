import { toggleImportanceOf } from '../reducers/noteReducer'
import { useSelector,useDispatch } from 'react-redux'


const Note = ({ note,handelClick }) => {
    return(
        <li onClick={handelClick}>{note.content}<strong> {note.important ? ' important ' : ''}</strong></li>
    )
}

const Notes = () => {
    const notes = useSelector(state => state)
    const dispatch = useDispatch()
    return (
        <ul>
            {notes.map(note => 
                <Note key={note.id}
                      note={note}
                      handelClick={() => dispatch(toggleImportanceOf(note.id))}
                />
            )}
        </ul>
    )
}
export default Notes