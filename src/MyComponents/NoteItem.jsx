import React,{useContext} from 'react'
import NoteContext from "../context/NoteContext";

const NoteItem = (props) => {
  const context = useContext(NoteContext)
    const { deleteNote } = context;
  const { note, updateNote } = props;
  return (
    <div className='col-md-3'>
      <div className="card my-3" style={{width: "16rem"}}>
          <div className="card-body">
            <div className="display-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
             </div>
            <p className="card-text">{note.description}</p>
            <p className="card-text">{note.tag}</p>
            <i className="fa-solid fa-pen-to-square " style={{cursor: "pointer"}} onClick={()=>{updateNote(note)}}></i>
            <i className="fa-solid fa-trash mx-2 " style={{cursor: "pointer"}} onClick={()=>{deleteNote(note._id);
              props.showAlert("Note Deleted Successfully!", "success");
            }}></i>
          </div>
      </div>
    </div>
  )
}

export default NoteItem
