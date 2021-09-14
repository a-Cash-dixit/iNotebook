import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import noteContext from "../context/notes/noteContext";
import { useContext } from "react";

function Noteitem(props) {
  const { note, updateNote, showAlert } = props;
  const context = useContext(noteContext);
  const { deleteNote } = context;
  return (
    <div className="note">
      <h1>{note.title}</h1>
      <p>{note.description}</p>
      <h6>{note.tag}</h6>
      <button
        onClick={() => {
          deleteNote(note._id);
          showAlert("Deleted successfully", "success");
        }}
      >
        <DeleteIcon />
      </button>
      <button
        onClick={() => {
          updateNote(note);
        }}
      >
        <EditIcon />
      </button>
    </div>
  );
}

export default Noteitem;
