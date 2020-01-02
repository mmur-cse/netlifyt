import React from 'react';

import './App.css';


const leftPad = (width, n) => {
  if ((n + '').length > width) {
	  return n;
  }
  const padding = new Array(width).join('0');
  return (padding + n).slice(-width);
};



class App extends React.Component {
	componentDidMount () {
    // Include the Crisp code here, without the <script></script> tags
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = "912c89d2-94f2-466e-8cc4-37a58cc13146";

    (function() {
      var d = document;
      var s = d.createElement("script");

      s.src = "https://client.crisp.chat/l.js";
      s.async = 1;
      d.getElementsByTagName("head")[0].appendChild(s);
    })();
   };
  
  constructor(props) {
    super(props);
    
    ["lap", "update", "reset", "toggle"].forEach((method) => {
    	this[method] = this[method].bind(this);
    });

    this.state = this.initialState = {
      isRunning: false,
      lapTimes: [],
      timeElapsed: 0,
    };
  }
  toggle() {
    this.setState({isRunning: !this.state.isRunning}, () => {
      this.state.isRunning ? this.startTimer() : clearInterval(this.timer)
    });
  }
  lap() {
    const {lapTimes, timeElapsed} = this.state;
    this.setState({lapTimes: lapTimes.concat(timeElapsed)});
  }
  reset() {
    clearInterval(this.timer);
    this.setState(this.initialState);
  }
  startTimer() {
    this.startTime = Date.now();
    this.timer = setInterval(this.update, 10);
  }
  update() {
    const delta = Date.now() - this.startTime;
    this.setState({timeElapsed: this.state.timeElapsed + delta});
    this.startTime = Date.now();
  }
  render() {
    const {isRunning, lapTimes, timeElapsed} = this.state;
    return (
	    
      
      <div style={{color:'white'}}>
        <h2>Timsy Stopwatch</h2>
        <TimeElapsed id="timer" timeElapsed={timeElapsed} />
        <button onClick={!isRunning  && timeElapsed ? this.reset : this.toggle}>
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <button
          onClick={isRunning ? this.lap : this.reset}
          disabled={!isRunning && !timeElapsed}
         >
          {isRunning || !timeElapsed ? 'Lap' : 'Reset'}
        </button>
        {lapTimes.length > 0 && <LapTimes lapTimes={lapTimes} />}
	     
	    <footer id="footer"><p id="copyright">&copy; Maryam Corporate </p></footer>
      </div>
      
    );
  }
}

class TimeElapsed extends React.Component {
  getUnits() {
    const seconds = this.props.timeElapsed / 1000;
    return {
      min: Math.floor(seconds / 60).toString(),
      sec: Math.floor(seconds % 60).toString(),
      msec: (seconds % 1).toFixed(3).substring(2)
    };
  }
  render() {
    const units = this.getUnits();
    return (
      <div id={this.props.id}>
        <span>{leftPad(2, units.min)}:</span>
        <span>{leftPad(2, units.sec)}.</span>
        <span>{units.msec}</span>
      </div>
    );
  }
}

class LapTimes extends React.Component {
  render() {
    const rows = this.props.lapTimes.map((lapTime, index) =>
      <tr key={++index}>
        <td>{index}</td>
        <td><TimeElapsed timeElapsed={lapTime} /></td>
      </tr>
    );
    return (
      <table id="lap-times">
        <thead>
          <th>Lap</th>
          <th>Time</th>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

export default App;
