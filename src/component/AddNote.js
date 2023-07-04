import React, { useContext } from "react";
import { useState } from "react";
import noteContext from "../context/notes/NoteContext";

const AddNote = (props) => {

  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: ""
  });

  // The handle click function is created because after writing all the required text the add note button will take all the required things and put it in the database
  const handleClick = (e) => {

    // it will prevent the page to load again
    e.preventDefault();

    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    props.showAlert("Note Added Successfully","success")
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container col-6">
      <form>
        <div className="container mb-2 mt-4 ">
          <h2>Add a Note </h2>
          <div className="mb-3 my-2">
            <label htmlFor="title" className="form-label fw-bold">
              Title
            </label>
            <input
              type="text"
              className="form-control border border-primary"
              id="title"
              value={note.title}
              name="title"
              placeholder="Title"
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label fw-bold">
              Description
            </label>
            <textarea
              className="form-control border border-primary"
              id="description"
              rows="3"
              name="description"
              placeholder="Description"
              value={note.description}
              onChange={onChange}
              minLength={5}
              required
            ></textarea>
          </div>
          <div className="mb-3 my-2">
            <label htmlFor="tag" className="form-label fw-bold">
              Tag
            </label>
            <input
              type="text"
              className="form-control border border-primary"
              id="tag"
              name="tag"
              value={note.tag}
              placeholder="Tag"
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
        </div>
        <button
          disabled={note.title.length < 5 || note.description.length < 5}
          type="submit"
          className="btn btn-primary glow-on-hover glowing"
          onClick={handleClick}
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote