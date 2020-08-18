import axios from "axios";
import React, { Component } from "react";

export default class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.onChangeUserName = this.onChangeUserName.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.state = {
      users: [],
      username: ''
    };
  }
  componentDidMount() {
    this.getUsers()
  }
  onChangeUserName(ev) {
    this.setState({username: ev.target.value})
  }
  async onSubmit(ev) {
    ev.preventDefault()
    await axios.post('http://localhost:9090/api/users', { username: this.state.username })
    this.setState({username: ''})
    this.getUsers()
  }
  getUsers = async () => {
    const res = await axios.get("http://localhost:9090/api/users");
    await this.setState({ users: res.data });
  }
  doubleClick = async (id) => {
    await axios.delete(`http://localhost:9090/api/users/${id}`)
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <div className="card card-body">
            <h3>Create New User</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <input type="text" className="form-control" value={this.state.username} onChange={this.onChangeUserName}/>
              </div>
              <button className="btn btn-primary">
                Save
              </button>
            </form>
          </div>          
        </div>
        <div className="col-md-8">
          <ul className="list-group">
            {this.state.users.map((user, index) => (
              <li
                key={index}
                className="list-group-item list-group-item-action"
                onDoubleClick={() => {this.doubleClick(user._id); this.getUsers()}}
              >
                {user.username}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
