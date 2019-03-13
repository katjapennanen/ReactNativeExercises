import { SQLite } from "expo";

import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";

const db = SQLite.openDatabase("coursedb.db");

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      credit: "",
      title: "",
      courses: []
    };
  }

  componentDidMount() {
    db.transaction(tx => {
      tx.executeSql(
        "create table if not exists course (id integer primary key not null, credits int, title text"
      );
    });
  }

  saveItem = () => {
      db.transaction( tx => {
          tx.executeSql('insert into course (credits, title) values (?, ?))',
          [parseInt(this.state.credit), this.state.title]);
      }, null, this.updateList)
  }

  updateList = (id) => {
    db.transaction(tx => {
        tx.executeSql('select * from course', [], (_, {rows}) => 
        this.setState({courses: rows._array})
        );
    })
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Text style={{ fontSize: 17 }}>Courses</Text>
        <Text style={{ marginTop: 10, fontWeight: "bold" }}>
          {this.state.output}
        </Text>
        <View>
          <TextInput
            style={styles.inputStyle}
            placeholder="Title"
            onChangeText={title => this.setState({ title })}
            value={this.state.title}
          />
          <TextInput
            style={styles.inputStyle}
            placeholder="Credits"
            onChangeText={credits => this.setState({ credits })}
            value={this.state.credits}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={this.saveItem} title="Save" />
        </View>
        <FlatList
        style={{marginLeft: '5%'}}
        keyExtractor={item => item.id}
        renderItem={({item}) =>
            <View style={}></View>
        </FlatList>
      </View>
    );
  }
}
