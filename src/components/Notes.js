import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useHistory } from "react-router";
const Notes = (props) => {
  const context = useContext(noteContext);
  let history = useHistory();
  const { notes, GetNotes } = context;
  useEffect(() => {
    if (localStorage.getItem("token")) {
      GetNotes();
    } else {
      history.push("/login");
    }
  });
  const updateNote = (note) => {};
  return (
    <React.Fragment>
      <AddNote showAlert={props.showAlert} />
      <div className="row my-3">
        {notes.map((note) => {
          return (
            <Noteitem
              key={note._id}
              note={note}
              updateNote={updateNote}
              showAlert={props.showAlert}
            />
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default Notes;
