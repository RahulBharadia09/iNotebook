// This is the main thing were we will bring all the backend work here
// learn more about useEffect useRef useState localstorage

import React, { useContext, useState } from "react";
import noteContext from "../context/notes/NoteContext";
import AddNote from "./AddNote";
import NotesItem from "./NotesItem";
import { useEffect } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const NotesComponent = (props) => {
  const context = useContext(noteContext);

  let history = useNavigate();
  // destructering
  const { notes, getNotes, editNote } = context;

  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes()
    }else{
      history("/login");
    }
       }
    // eslint-disable-next-line
  , []);

  const ref = useRef(null);
  const refClose = useRef(null);

  // here we have set the initial stage of notes
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  // this function is used when we update anything from the model
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  // here after editing the note
  const handleClick = (e) => {
    refClose.current.click();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    props.showAlert("Note Edited Successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote showAlert={props.showAlert} />

      {/* starting of the model form where we need to edit */}

      {/* button is disabled of the model */}
      <div className="my-2">
        {/* <!-- Button trigger modal --> */}
        <button
          ref={ref}
          type="button"
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Launch demo modal
        </button>
      </div>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <form>
              <div className="container mb-2 my-3 fw-bold">
                <h3 className="text-center">Update Note </h3>
                <div className="mb-3 my-2">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    value={note.etitle}
                    type="text"
                    className="form-control border border-primary"
                    id="etitle"
                    name="etitle"
                    placeholder="etitle"
                    minLength={5}
                    required
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <textarea
                    value={note.edescription}
                    className="form-control border border-primary"
                    id="edescription"
                    rows="3"
                    name="edescription"
                    onChange={onChange}
                    placeholder="Description"
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    value={note.etag}
                    type="text"
                    className="form-control border border-primary"
                    id="etag"
                    name="etag"
                    placeholder="Tag"
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  ref={refClose}
                  type="button"
                  className="btn btn-outline-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  onClick={handleClick}
                  type="button"
                  className=" btn btn-outline-primary glow-on-hover glowing"
                  disabled={
                    note.etitle.length < 5 || note.edescription.length < 5
                  }
                >
                  Update Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="container">
        <h2>Your Notes</h2>

        {notes.length === 0 && "No Notes to Display"}
        <div className="row">
          {notes && notes.length > 0
            ? notes.map((note) => {
                return (
                  <NotesItem
                    showAlert={props.showAlert}
                    key={note._id}
                    updateNote={updateNote}
                    note={note}
                  />
                );
              })
            : null}
        </div>
      </div>
    </>
  );
}

export default NotesComponent