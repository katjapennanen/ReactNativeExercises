import { Camera, Permissions } from "expo";
import React, { Component } from "react";
import { View, Text,  Button, Image } from "react-native";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      photoName: "",
      photoBase64: ""
    };
    this.camera= React.createRef();
  }

  componentDidMount() {
    this.askCameraPermission();
  }

  askCameraPermission = async () => {
    let { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted'});
  }

  snap = async () => {
    if (this.camera) {
      let photo = await
      this.camera.current.takePictureAsync({base64:true});
      this.setState({photoName: photo.uri, photoBase64: photo.base64})
    }
  }

  render() {
    if (this.state.hasCameraPermission == null) {
      return <View />;
    } else if (this.state.hasCameraPermission == false) {
      return <Text>No access to camera</Text>
    } else {
      return (
        <View style={{flex: 1}}>
          <Camera style={{flex: 1}} ref={this.camera}/>
          <View>
            <Button title="Take photo" onPress={this.snap} />
          </View>
          <View style={{flex: 1}}>
            <Image style={{flex: 4}} source= {{uri: this.state.photoName}} />
            <Image style={{flex: 4}} source={{uri: `data:image/gif;base64,${this.state.photoBase64}`}}/>
          </View>
        </View>
      );
    }
    
  }
}
