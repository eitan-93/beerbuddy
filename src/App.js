import './App.css';
import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { NavigationBar } from './components/NavigationBar';
import BrowseBeers from './components/BrowseBeers';
import FavoriteBeers from './components/FavoriteBeers';
import {Provider} from 'react-redux';
import store from './store'


export default function App(){


    return(
      <Provider store ={store}>
      <React.Fragment>
        <Router >
          <NavigationBar />
          <Switch>
            <Route exact  path="/BrowseBeers" component={BrowseBeers} /> 
            <Route path="/FavoriteBeers"  component={FavoriteBeers} />
            <Redirect exact from="/" to="/BrowseBeers" />
            <Redirect exact from="/BeerBuddy" to="/BrowseBeers" />
          </Switch>
        </Router>
      </React.Fragment>
      </Provider>
    
    )
  }
