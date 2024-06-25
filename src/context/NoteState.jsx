
import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) =>{
  const host = "http://localhost:5000"
    const NotesInitial = []
      const [notes, setNotes] = useState(NotesInitial)
      const fetchNotes =  async () =>{
        // API Call
        const response = await fetch(`${host}/api/notes/fetchNotes`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
        
        });
        const json = await response.json();
        console.log(json)
        setNotes(json)
        }

        // Adding a note
      const addNote =  async (title, description, tag) =>{
      // API Call
      const response = await fetch(`${host}/api/notes/addNotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({title, description, tag}), 
      });
      
    
      // Add Note
        console.log("add a note")
        const note = await response.json()
           setNotes(notes.concat(note)); // returns a new array can used push and concat method to add a note
      }

      // Delete  Note will take a parameter to delete the note
      const deleteNote = async (id) =>{

        // API CALL
        const response = await fetch(`${host}/api/notes/Deletenotes/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
        }
        });
        const json = await response.json();
        console.log(json);
       console.log("Deleting the note with id" + id);
       const newNotes = notes.filter((note)=>{return note._id!==id}) // filter method is used to delete the notes
       setNotes(newNotes)
      }

      // Edit Note

      const editNote = async (id, title, description, tag) =>{
        // API Call for fetching api
        const response = await fetch(`${host}/api/notes/Updatenotes/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
        },
          body: JSON.stringify({title, description, tag}), 
        });
        const json = await response.json();
       console.log(json);


        const newNotes = JSON.parse(JSON.stringify(notes))
        // To Edit the Note in Client side
        // using for loop 
        for (let index = 0; index < newNotes.length; index++) {
          const element = newNotes[index];
          if(element._id===id){
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag;
            break;
          }
        }
        setNotes(newNotes);
      
      }
    return(

    <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, fetchNotes}}> 
        {props.children}
    </NoteContext.Provider>
    );
}
export default NoteState 