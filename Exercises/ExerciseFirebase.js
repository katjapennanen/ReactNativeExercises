import * as firebase from 'firebase';
import React, { Component } from "react";
import { View, Text, FlatList, TextInput, Button } from "react-native";
import { config } from './Keys'
import styles from "./Styles/styles";

firebase.initializeApp(config)

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: "",
      amount: "",
      shoppingList: []
    };
  }

  componentDidMount() {
    firebase.database().ref('items/').on('value', snapshot => {
      const data = snapshot.val();
      const shoppingList = Object.values(data);
      this.setState({shoppingList});
    });
  }

  saveItem = () => {
    firebase.database().ref('items/').push(
      {'product': this.state.product, 'amount': this.state.amount}
    );
  };

  render() {
    return (
      <View style={styles.mainContainer12}>
        <View>
          <TextInput
            style={styles.inputStyle}
            placeholder="Item"
            onChangeText={product => this.setState({ product })}
            value={this.state.product}
          />
          <TextInput
            style={styles.inputStyle}
            placeholder="Amount"
            onChangeText={amount => this.setState({ amount })}
            value={this.state.amount}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={this.saveItem} title="Add" />
        </View>
        <Text style={{ fontSize: 17 }}>Shopping List</Text>
        <FlatList
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.historyContainer}>
              <Text>
                {item.product}, {item.amount}{" "}
              </Text>
            </View>
          )}
          data={this.state.shoppingList}
        />
      </View>
    );
  }
}
