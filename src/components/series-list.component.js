import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const Series = props => (
  <tr>
    <td>
      <Link to={'/series/'+props.series._id} 
      username={props.series.username}>{props.series.username}</Link></td>
    <td>{props.series.title}</td>
    <td>{props.series.description.substring(0,50)}{props.series.description.length > 40 ? '...' : ''}</td>
    <td>{props.series.stars}</td>
    <td>{props.series.date.split('T')[0]}</td>
    <td>
      <Link to={'/edit/'+props.series._id}>edit</Link> | <a href="#" 
      onClick={() => {props.deleteSeries(props.series._id)}}>delete</a>
    </td>
  </tr>
)

export default class SeriesList extends Component {
  constructor(props) {
    super(props)

    this.deleteSeries = this.deleteSeries.bind(this)

    this.state = {
      series: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3000/series')
      .then(res => {
        this.setState({
          series: res.data
        })
      })
      .catch(err => console.log(err))
  }

  deleteSeries(id) {
    axios.delete('http://localhost:3000/series/'+id)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))

    this.setState({
      series: this.state.series.filter(el => el._id !== id)
    })
  }

  seriesList() {
    return this.state.series.map(currentSeries => {
      return <Series series={currentSeries} deleteSeries={this.deleteSeries}
                key={currentSeries.id} />
    })
  }

  render() {
    return (
      <div>
        <h3>Series Entries:</h3>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th>Username</th>
              <th>Title</th>
              <th>Description</th>
              <th>Stars</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.seriesList()}
          </tbody>
        </table>
      </div>
    )
  }
}