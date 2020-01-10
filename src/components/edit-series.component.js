import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class EditSeries extends Component {
  constructor(props) {
    super(props)

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeStars = this.onChangeStars.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      title: '',
      description: '',
      stars: 0,
      date: new Date(),
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3000/series/'+this.props.match.params.id)
        .then(res => {
          this.setState({
            username: res.data.username,
            title: res.data.title,
            description: res.data.description,
            stars: res.data.stars,
            date: new Date(res.data.date),
          }
          )
          console.log(this.state.title)
          console.log(this.state.stars)
        })
        .catch(err => console.log(err))

    
    axios.get('http://localhost:3000/users')
          .then(res => {
            this.setState({
              users: res.data.map(user => user.username)
            })
          })
          .catch(err => console.log(err))
  };

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    })
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
  e.preventDefault() 

  const series = {
    username: this.state.username,
    title: this.state.title, 
    description: this.state.description,
    stars: this.state.stars,
    date: this.state.date
  }

  console.log(series)

  axios.post('http://localhost:3000/series/update/'+this.props.match.params.id, series)
        .then(res => console.log(res.data))

  window.location = '/'
}

  render() {
    return (
      <div>
         <h3>Edit Series Entry</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <select ref="userInput"
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}>
                {
                  this.state.users.map(function(user) {
                    return <option 
                      key={user}
                      value={user}>{user}
                      </option>;
                  })
                }
            </select>
          </div>
          <div className="form-group"> 
            <label>Title: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.title}
                onChange={this.onChangeTitle}
                />
          </div>
          <div className="form-group"> 
            <label>Description: </label>
            <textarea  rows="5"
                required
                className="form-control"
                value={this.state.description}
                onChange={this.onChangeDescription}
                />
          </div>
          <div className="form-group">
            <label>Stars: </label>
            <select className='form-control' value={this.state.stars} 
            onChange={this.onChangeStars}>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="form-group">
            <label>Date: </label>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>

          <div className="form-group">
            <input type="submit" value="Edit Series Entry" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}