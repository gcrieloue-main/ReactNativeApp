import React from 'react';
import { StyleSheet, Text, View, Button, TouchableHighlight } from 'react-native';
import moment from 'moment';

export class Timer extends React.Component {
  constructor(props) {
    console.disableYellowBox = true
    console.warn('construct')
    super(props)
    this.state = {
      initDate: moment().hours(0).minutes(0).seconds(0),
      remaining: moment().hours(0).minutes(0).seconds(0)
    }
  }

  tick = () => {
    if (this.state && this.state.initDate) {
      let timeWhenFinished = this.state.initDate.clone().add(90, 'seconds');
      let duration = moment.duration(timeWhenFinished.diff(moment()))
      let remaining = moment.utc(duration.as('milliseconds'))
      this.setState({
        ...this.state,
        remaining: remaining
      });
    }
  }

  reset = () => {
    if (this.interval) {
      clearInterval(this.interval)
    }
    this.state = {
      initDate: moment()
    }
    this.interval = setInterval(this.tick, 1000);
  }

  _onPress = () => {
    this.reset();
  }

  render() {
    if (!this.state.remaining) return false;
    let text = "GO";
    if (!(this.state.remaining.hours() == 0
      && this.state.remaining.minutes() == 0
      && this.state.remaining.seconds() == 0)) {
      text = this.state.remaining.format("mm:ss")
    }
    return (
      <TouchableHighlight onPress={this._onPress}>
        <View style={styles.timer}>
          <Text style={styles.text}>{text}</Text>
        </View>
      </TouchableHighlight >
    );
  }
}


export default class App extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Timer></Timer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 32
  },
  timer: {
    color: 'yellow',
    fontSize: 64,
  },
  text: {
    fontSize: 128
  }
});
