import React from "react";
import { Text, View, Button, TextInput } from "react-native";
import styles from "./Styles/styles";

//Exercise 1 - Katja Pennanen
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { num1: "", num2: "", result: "" };
  }

  plusButton = () => {
    this.setState({
      result: Number(this.state.num1) + Number(this.state.num2)
    });
  };

  minusButton = () => {
    this.setState({
      result: Number(this.state.num1) - Number(this.state.num2)
    });
  };

  render() {
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
        </View>
      </View>
    );
  }
}
