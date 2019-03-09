import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import moment from 'moment';

export class Timer extends React.Component {
  constructor(props) {
    console.disableYellowBox = true
    console.warn('construct')
    super(props)
    this.state = {
      initDate: moment().minutes(0).seconds(0),
      remaining: moment().minutes(0).seconds(0)
    }
  }

  tick = () => {
    console.warn('tick' + JSON.stringify(this.state));
    if (this.state && this.state.initDate) {
      let timeWhenFinished = this.state.initDate.clone().add(1, 'minutes').add(30, 'seconds');
      console.warn("finished at " + timeWhenFinished.format("HH:mm:ss"))
      let remaining = moment
        .utc(moment(moment(), "DD/MM/YYYY HH:mm:ss")
          .diff(moment(timeWhenFinished, "DD/MM/YYYY HH:mm:ss")))
      console.warn("remain " + remaining.format("HH:mm:ss"))
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

  _onPressButton = () => {
    this.reset();
  }

  render() {
    if (!this.state.remaining) return false;
    return (
      <View>
        <Text>{this.state.remaining.format("mm:ss")}</Text>
        <Button onPress={this._onPressButton} title="Reset" />
      </View>
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
});
