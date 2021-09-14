import { useState } from "react";
import NoteContext from "./noteContext";
const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setnotes] = useState(notesInitial);
  //Get all Notes
  const GetNotes = async () => {
    //API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setnotes(json);
  };
  //Add a Note
  const addNote = async (title, description, tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();
    console.log(json);
    console.log("Adding a new note.");
    const note = {
      title: title,
      description: description,
      tag: tag,
    };
    setnotes(notes.concat(note));
  };
  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    //API Call
    const response = await fetch(`${host}/api/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json(); // parses JSON response into native JavaScript objects
    console.log(json);
    //Logic to edit a note
    for (let i = 0; i < notes.length(); i++) {
      const element = notes[i];
      if (element._id === id) {
        element.description = description;
        element.title = title;
        element.tag = tag;
      }
    }
  };
  // Delete a Note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = response.json();
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setnotes(newNotes);
    console.log(json);
  };
  return (
    <NoteContext.Provider
      value={{ notes, setnotes, addNote, editNote, deleteNote, GetNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
