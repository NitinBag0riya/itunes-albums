import React, { Component } from 'react';
import AlbumsContainer from "./components/Albums/AlbumsContainer";
import { SimpleImg, initSimpleImg } from 'react-simple-img';
import './App.css';


class App extends Component {
  render(){
    return (
      <React.Fragment>
        <AlbumsContainer />
      </React.Fragment>
    );
  }
}

export default App;


