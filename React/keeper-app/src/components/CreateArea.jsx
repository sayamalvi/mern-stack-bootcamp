import React, { useState } from "react";
import { Add } from "@material-ui/icons";
import { Fab } from "@material-ui/core";
import { Zoom } from "@material-ui/core";
function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });
  const [zoom, setZoom] = useState(false);
  function handleZoom() {
    setZoom(true);
  }
  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      title: "",
      content: ""
    });
    event.preventDefault();
  }

  return (
    <div>
      <form className="create-note">
        <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
          onClick={handleZoom}
        />
        {zoom &&
          <textarea
            name="content"
            onChange={handleChange}
            value={note.content}
            placeholder="Take a note..."
            rows="3"
          />
        }
        <Zoom in={zoom}>
          <Fab onClick={submitNote}><Add /></Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
