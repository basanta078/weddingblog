import React, { Component } from "react";
import ProgressRing from './progress-ring';
import Media from 'react-media';

import styles from './clock.module.css'

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  }
  componentWillMount() {
    this.getTimeUntil(this.props.deadline);
  }
  componentDidMount() {
    setInterval(() => this.getTimeUntil(this.props.deadline), 1000);
  }
  
  getTimeUntil(deadline) {
    const time = Date.parse(deadline) - Date.parse(new Date());
    if (time < 0) {
      this.setState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    } else {
      const seconds = Math.floor((time / 1000) % 60);
      const minutes = Math.floor((time / 1000 / 60) % 60);
      const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
      const days = Math.floor(time / (1000 * 60 * 60 * 24));
      this.setState({ days, hours, minutes, seconds });
    }
  }
  render() {
    return (
      <div className={styles.clock}>
        <Counter number={this.state.days} label="Days" progress={100}/>
        <Counter number={this.state.hours} label="Hours" progress={this.state.hours / 24 * 100}/>
        <Counter number={this.state.minutes} label="Minutes" progress={ this.state.minutes / 60 * 100 }/>
        <Counter number={this.state.seconds} label="Seconds" progress={ this.state.seconds / 60 * 100}/>
      </div>
    );
  }
}

function leading0(num) {
  return num < 10 ? "0" + num : num;
}
function Counter ({number, label, progress}){
  return (
    <div className={styles.clockElement}>
      <Media query="(max-width: 599px)">
        {matches =>
          matches ? (
            <ProgressRing
              radius={ 36 }
              stroke={ 1 }
              progress={ progress}
            />
          ) : (
            <ProgressRing
              radius={ 84 }
              stroke={ 2 }
              progress={ progress}
            />)
        }
      </Media>
      
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: ''}}>
        <text className={styles.counterNumber}>{leading0(number)}</text>
        <text className={styles.counterLabel}>{label}</text>
      </div>
    </div>
  );
}
export default Clock;
