import React, { Component } from "react";
import { Text, View, Button, TextInput } from "react-native";
import styles from "../../Styles/styles";

export default class Calculator extends React.Component {
  static navigationOptions = { title: "Calculator" };

  constructor(props) {
    super(props);
    this.state = { num1: "", num2: "", result: "", historyArray: ["Empty"] };
  }

  plusButton = () => {
    var result = Number(this.state.num1) + Number(this.state.num2);
    var historyItem = `${this.state.num1} + ${this.state.num2} = ${result}`;
    this.setState({
      result: result,
      historyArray: [...this.state.historyArray, { key: historyItem }]
    });
  };

  minusButton = () => {
    var result = Number(this.state.num1) - Number(this.state.num2);
    var historyItem = `${this.state.num1} - ${this.state.num2} = ${result}`;
    this.setState({
      result,
      historyArray: [...this.state.historyArray, { key: historyItem }]
    });
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.mainContainer}>
        <Text style={{ fontSize: 30 }}>Result: {this.state.result}</Text>
        <View>
          <TextInput
            style={styles.inputStyle}
            keyboardType="number-pad"
            onChangeText={num1 => this.setState({ num1 })}
            value={this.state.num1}
          />
          <TextInput
            style={styles.inputStyle}
            keyboardType="number-pad"
            onChangeText={num2 => this.setState({ num2 })}
            value={this.state.num2}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={this.plusButton} title=" + " />
          <Button onPress={this.minusButton} title=" - " />
          <Button
            onPress={() =>
              navigate("History", { historyArray: this.state.historyArray })
            }
            title="History"
          />
        </View>
      </View>
    );
  }
}
