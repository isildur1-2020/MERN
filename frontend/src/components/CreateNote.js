import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class CreateNote extends Component {
  state = {
    users: [],
    userSelected: "",
    title: "",
    content: "",
    date: new Date(),
    editing: false,
    _id: "",
  };
  async componentDidMount() {
    if (this.props.match.params.id) {
      const user = await axios.get(
        `http://localhost:9090/api/notes/${this.props.match.params.id}`
      );
      await this.setState({
        editing: true, 
        _id: this.props.match.params.id,
        userSelected: user.data.author,
        title: user.data.title,
        content: user.data.content,
        date: new Date(user.data.date)
      });
      return;
    }

    const users = await axios.get("http://localhost:9090/api/users");
    this.setState({
      users: users.data.map((user) => user.username),
      userSelected: users.data[0].username,
    });
  }
  onSubmit = async (ev) => {
    ev.preventDefault();
    const newNote = {
      title: this.state.title,
      content: this.state.content,
      date: this.state.date,
      author: this.state.userSelected,
    };
    if (this.state.editing) {
      await axios.put(
        `http://localhost:9090/api/notes/${this.state._id}`,
        newNote
      );
    } else {
      await axios.post("http://localhost:9090/api/notes", newNote);
    }
    window.location.href = "/";
  };
  onInputChange = async (ev) => {
    console.log(`${ev.target.name}: ${ev.target.value}`);
    this.setState({ [ev.target.name]: ev.target.value });
  };
  onChangeDate = (date) => {
    this.setState({ date });
  };
  render() {
    return (
      <div className="col-md-6 offset-md-3">
        <div className="card card-body">
          <h4>Create Note</h4>
          <div className="form-group">
            <select
              className="form-control"
              name="userSelected"
              onChange={this.onInputChange}
              value={this.state.userSelected}
            >
              {this.state.users.length > 0 &&
                this.state.users.map((user, index) => (
                  <option key={index} value={user}>
                    {user}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="Title"
              required
              name="title"
              onChange={this.onInputChange}
              value={this.state.title}
            />
          </div>
          <div className="form-group">
            <textarea
              className="form-control"
              name="content"
              placeholder="Content"
              required
              onChange={this.onInputChange}
              value={this.state.content}
            ></textarea>
          </div>
          <div className="form-group">
            <DatePicker
              className="form-control"
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
          <form onSubmit={this.onSubmit}>
            <button className="btn btn-primary">Save a Note</button>
          </form>
        </div>
      </div>
    );
  }
}
