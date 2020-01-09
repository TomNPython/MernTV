import React, { Component, createElement } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
  constructor(props) {
    super(props)

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this)

    this.state = {
      username: ''
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }


  onSubmit(e) {
    e.preventDefault()


    const newUser = {
      username: this.state.username
    };

    console.log(newUser);

    axios.post('http://localhost:3000/users/add', newUser)
            .then(res => {
              console.log(res.data)
              this.setState({
                success: 'User Created!',
                errors: ''
              })
            })
            .catch(err => {
              console.log(err)
              this.setState({
                errors: 'Username must be unique & at least 3 characters long.',
                success: ''
              })
            })

    this.setState({
      username: ''
    })
  }


  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input type="text" required
            className='form-control'
            value={this.state.username}
            onChange={this.onChangeUsername}/>
          </div>
          <div className="form-group">
            <input type="submit" value='Create User' className='btn btn-primary'/>
          </div>
        </form>
        <p className='badge badge-danger'>{this.state.errors}</p>
        <p className='badge badge-success'>{this.state.success}</p>
      </div>
    )
  }
}