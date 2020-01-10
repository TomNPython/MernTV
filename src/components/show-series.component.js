import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';

export default class ShowSeries extends Component {
        constructor(props) {
            super(props)

            this.state = {
                username: ''
            }
            console.log(this.state.username)
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
                  
                })
                .catch(err => console.log(err))
            }

  
  render() {
      return (
          <div className='series-review'>
            <label>Review Left By:</label>
            <h4>{this.state.username}</h4>
            <label>Title:</label>
            <h4>{this.state.title}</h4>
            <label>Description:</label>
            <h4>{this.state.description}</h4>
            <label>Star Rating:</label>
            <h4>{this.state.stars} stars</h4>
          </div>
      )}
}
