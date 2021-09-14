import React, { useState, useContext } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import noteContext from "../context/notes/noteContext";
const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [isExpanded, setExpanded] = useState(false);
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "default",
  });
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    props.showAlert("Added note sucessfully!", "success");
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  function expand() {
    setExpanded(true);
  }
  return (
    <div className="container row-3">
      <form className="create-note">
        {isExpanded && (
          <input
            id="title"
            type="text"
            name="title"
            placeholder="Title"
            onChange={onChange}
          />
        )}
        {isExpanded && (
          <input
            id="tag"
            type="text"
            name="tag"
            placeholder="Tag"
            onChange={onChange}
          />
        )}
        {isExpanded && (
          <input
            id="description"
            type="text"
            name="description"
            placeholder="Describe..."
            onChange={onChange}
          />
        )}
        <textarea
          onClick={expand}
          placeholder="Add a note..."
          rows={isExpanded ? 2 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab>
            {note.title.length > 3 && note.description.length > 5 && (
              <AddIcon onClick={handleClick} />
            )}
          </Fab>
        </Zoom>
      </form>
    </div>
  );
};

export default AddNote;
