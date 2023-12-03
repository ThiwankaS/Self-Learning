const NoteForm = ({ onSubmit,handleChange,value }) => {
    return(
        <div>
            <form onSubmit={onSubmit}>
                <h3>Add new note</h3>
                <input value={value} onChange={handleChange}/>
                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default NoteForm