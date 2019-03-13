import React from "react";
import { Text, View, Button, TextInput, FlatList } from "react-native";
import styles from "./Styles/styles";

// Exercise 3 - Katja Pennanen
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { num1: "", num2: "", result: "", historyArray: [] };
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
    return (
      <View style={styles.mainContainerE3}>
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
        <View style={styles.historyContainer}>
          <Text>History:</Text>
          <FlatList
            data={this.state.historyArray}
            renderItem={({ item }) => <Text>{item.key}</Text>}
          />
        </View>
      </View>
    );
  }
}
