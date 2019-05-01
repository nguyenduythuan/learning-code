import React, { Component} from 'react';
import './App.css';
import TrafficLight from './components/TrafficLight';

const RED = 1;
const GREEN = 2;
const ORANGE = 3;

class App extends Component {

  constructor () {
    super();
    this.state = {
        currentColor: RED
    }
    setInterval(() => {
        this.setState({
            currentColor: this.getNetColor(this.state.currentColor)
        });
    }, 3000);
}
getNetColor(color) {
    switch(color) {
        case RED: return ORANGE;
        case ORANGE: return GREEN;
        default: return RED;
    }
}

  render() {
    const state = this.state;
    return (
      <div className="App">
        <TrafficLight state={state}/>
      </div>
    );
  }
}

export default App;
