import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import { CalcButton } from '../presentations';

class Calc extends Component {
  constructor() {
    super();
    this.initial = {
      inputText: '',
      pendingOperation: null,
      firstOperand: ''
    };
    this.state = this.initial;
    this.validKeys = [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '+',
      '-',
      '/',
      '*',
      '=',
      'clear'
    ];
  }

  handleInput(text) {
    this.setState({
      inputText: text
    });
  }
  handleButtonInput(text) {
    if (['+', '-', '*', '/'].indexOf(text) > -1) {
      this.setState({
        pendingOperation: text,
        firstOperand: this.state.inputText,
        inputText: ''
      });
      return;
    } else if (text === '=') {
      this.calculate();
      return;
    } else if (text === 'clear') {
      this.setState(this.initial);
    } else {
      this.setState({
        inputText: this.state.inputText + text
      });
    }
  }

  calculate() {
    let result = null;
    switch (this.state.pendingOperation) {
      case '+':
        result = Number(this.state.firstOperand) + Number(this.state.inputText);
        result = result.toString();
        this.setState({
          inputText: result,
          pendingOperation: null,
          firstOperand: ''
        });
        return;
      case '-':
        result = Number(this.state.firstOperand) - Number(this.state.inputText);
        result = result.toString();
        this.setState({
          inputText: result,
          pendingOperation: null,
          firstOperand: ''
        });
        return;
      case '/':
        result = Number(this.state.firstOperand) / Number(this.state.inputText);
        result = result.toString();
        this.setState({
          inputText: result,
          pendingOperation: null,
          firstOperand: ''
        });
        return;
      case '*':
        result = Number(this.state.firstOperand) * Number(this.state.inputText);
        result = result.toString();
        this.setState({
          inputText: result,
          pendingOperation: null,
          firstOperand: ''
        });
        return;
      default:
        return;
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TextInput
          onChangeText={this.handleInput.bind(this)}
          value={this.state.inputText}
          style={styles.input}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: '#f1f1f1',
            flexDirection: 'column'
          }}
        >
          {this.validKeys.map((key, i) => {
            if (i % 2 != 0) {
              return;
            }
            return (
              <View style={styles.row}>
                <CalcButton
                  handleButtonInput={this.handleButtonInput.bind(this)}
                  value={this.validKeys[i]}
                />
                <CalcButton
                  handleButtonInput={this.handleButtonInput.bind(this)}
                  value={this.validKeys[i + 1]}
                />
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#rgb(41,41,41)',
    shadowColor: '#555',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    height: 120,
    width: 100 + '%',
    color: '#ffffff',
    fontSize: 48,
    textAlign: 'right'
  },
  row: {
    flex: 1,
    flexDirection: 'row'
  }
});

export default Calc;
