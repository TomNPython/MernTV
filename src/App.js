import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component"
import SeriesList from "./components/series-list.component";
import EditSeries from "./components/edit-series.component";
import CreateSeries from "./components/create-series.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <Navbar />
      <br/>
      <Route path="/" exact component={SeriesList} />
      <Route path="/edit/:id" component={EditSeries} />
      <Route path="/create" component={CreateSeries} />
      <Route path="/user" component={CreateUser} />
    </Router>
  );
}

export default App;
