import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'

export default class CreateSeries extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: '', 
      title: '', 
      description: '',
      stars: 0,
      date: new Date(),
      users: []
    };

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeStars = this.onChangeStars.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    axios.get('http://localhost:3000/users')
        .then(res => {
          if (res.data.length > 0) {
              this.setState({
                users: res.data.map(user => user.username),
                username: res.data[0].username
              })
        }
      })
      .catch(err => console.log(err))

  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeStars(e) {
    this.setState({
      stars: e.target.value
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const series = {
      username: this.state.username,
      title: this.state.title,
      description: this.state.description,
      stars: this.state.stars,
      date: this.state.date
    };

    console.log(series)

    axios.post('http://localhost:3000/series/add', series)
        .then(res => console.log(res.data))

    window.location = '/'
  }

  render() {
    return (
      <div>
        <h3>Create New Series Entry</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <select ref='userInput' required 
            className='form-control'
            value={this.state.username}
            onChange={this.onChangeUsername}>
              {this.state.users.map(function(user) {
                return <option 
                          key={user} 
                          value={user}>
                            {user}
                        </option>
                      })
                    }
            </select>
          </div>
          <div className="form-group">
            <label>Title:</label>
            <input type="text" 
            className='form-control'
            value={this.state.title}
            onChange={this.onChangeTitle}/>
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea rows='5'
            className='form-control'
            value={this.state.description}
            onChange={this.onChangeDescription}/>
          </div>
          <div className="form-group">
            <label>Stars:</label>
            <select className='form-control' onChange={this.onChangeStars}>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="form-group">
            <label>Date:</label>
            <DatePicker 
              selected={this.state.date}
              onChange={this.onChangeDate} 
            />
          </div>
          <div className="form-group">
            <input type="submit" value='Create Series Entry' className='btn btn-primary' />
          </div>
        </form>
      </div>
    )
  }
}