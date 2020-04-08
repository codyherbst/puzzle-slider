import React from 'react';
import './App.css';
import Board from '../Board'
import { Container } from 'reactstrap'

class App extends React.Component {
  render() {
    return (
      <Container>
        <Board />
      </Container>
    )
  }
}

export default App;