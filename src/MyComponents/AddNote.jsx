

import React, { useState, useContext } from 'react'
import NoteContext from "../context/NoteContext";
const AddNote = (props) => {
  const context = useContext(NoteContext)
  const { addNote } = context;
  const [note, setNotes] = useState({ title: "", description: "", tag: "" })

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNotes({title: "", description: "", tag: ""});
    props.showAlert("Note has been Added!", "success")
  }
  const onChange = (e) => {
    setNotes({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <div className="my-3">
      <h2>Add your Notes</h2>
      <div className="my-3">
        <form>
          <div className="mb-3 my-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" value={note.title}
              onChange={onChange}  minLength={5} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name='description'  value={note.description} onChange={onChange} minLength={5} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} />
          </div>
          <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
        </form>
      </div>
    </div>

  )
}

export default AddNote
