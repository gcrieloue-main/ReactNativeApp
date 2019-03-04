import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import moment from 'moment';

export class Timer extends React.Component {
  constructor(props) {
    console.disableYellowBox = true;
    console.warn('construct');

    super(props);
    this.reset();
    setInterval(this.tick, 1000);
  }

  tick = () => {
    console.warn('tick' + this.state);
    if (this.state && this.state.initDate) {
      let hours = moment().diff(this.state.initDate, 'hours');
      let minutes = moment().diff(this.state.initDate, 'minutes');
      let seconds = moment().diff(this.state.initDate, 'seconds');
      let remaining = moment().hours(hours).minutes(minutes).seconds(seconds);
      this.setState({
        remaining: remaining
      });
    }
  }

  reset = () => {
    let initDate = moment();
    this.state = {
      initDate: initDate
    }
  }

  render() {
    console.warn('render' + this.state.initDate.format("HH:mm"));

    if (!this.state.remaining) return false;
    return (
      <Text>{this.state.remaining.format("mm:ss")}</Text>
    );
  }
}


export default class App extends React.Component {

  _onPressButton() {

  }

  render() {
    return (
      <View style={styles.container}>
        <Timer></Timer>
        <Button onPress={this._onPressButton} title="Reset" />
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
