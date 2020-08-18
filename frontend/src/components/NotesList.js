import React, { Component } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";

export default class NotesList extends Component {
  state = {
    notes: [],
  };
  async componentDidMount() {
    const notes = await axios.get("http://localhost:9090/api/notes");
    this.setState({ notes: notes.data });
  }
  deleteNote = async (id) => {
    await axios.delete(`http://localhost:9090/api/notes/${id}`);
    const notes = await axios.get("http://localhost:9090/api/notes");
    this.setState({ notes: notes.data });
  };
  render() {
    return (
      <div className="row">
        {this.state.notes.map((note, index) => (
          <div className="col-md-4 p-2" key={index}>
            <div className="card-header d-flex justify-content-between ">
              <h5>{note.title}</h5>
              <Link className="btn btn-secondary" to={`/edit/${note._id}`}>Edit</Link>
            </div>
            <div className="card">
              <p>{note.content}</p>
              <p>{note.author}</p>
              <p>{format(note.date)}</p>
            </div>
            <button
              className="btn btn-danger"
              onClick={() => this.deleteNote(note._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    );
  }
}
