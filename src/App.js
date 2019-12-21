import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import SearchPage from './components/SearchPage';
import './App.css';
import "../node_modules/antd/dist/antd.css";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/search" component={SearchPage} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}
