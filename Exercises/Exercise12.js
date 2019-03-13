import { SQLite } from "expo";
import React, { Component } from "react";
import { View, Text, FlatList, TextInput, Button } from "react-native";
import styles from "./Styles/styles";

const db = SQLite.openDatabase("coursedb.db");

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
    db.transaction(tx => {
      tx.executeSql(
        "create table if not exists shopping_list (id integer primary key not null, product text, amount text);"
      );
    });
    this.updateList();
  }

  saveItem = () => {
    db.transaction(
      tx => {
        tx.executeSql(
          "insert into shopping_list (product, amount) values (?, ?)",
          [this.state.product,
          this.state.amount]
        );
      },
      null,
      this.updateList
    );
  };

  updateList = () => {
    db.transaction(tx => {
      tx.executeSql("select * from shopping_list", [], (_, { rows }) =>
        this.setState({ shoppingList: rows._array })
      );
    });
  };

  deleteItem = id => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from shopping_list where id = ?;`, [id]);
      },
      null,
      this.updateList
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
              <Text
                style={{color: "#0000ff" }}
                onPress={() => this.deleteItem(item.id)}
              >
                bought
              </Text>
            </View>
          )}
          data={this.state.shoppingList}
        />
      </View>
    );
  }
}
