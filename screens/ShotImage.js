import React, { Component } from 'react';
import { View, Image, CameraRoll } from 'react-native';
// Text, Button,
import { Container, Content, Button, Text } from 'native-base';
import { ImagePicker } from 'expo';
import { Card, ListItem, } from 'react-native-elements'

class ImagePickerSample extends Component {

    state = {
        image: null
    }

    // カメラを起動
    _takePhoto = async () => {
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: false
        });

        CameraRoll.saveToCameraRoll(result.uri);

        console.log(result);

        if (!result.cancelled) {
            this.setState({image: result.uri});
        }
    }

    // カメラロールから選択
    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [16, 9]
        });

        console.log(result);

        if (!result.cancelled) {
            this.setState({image: result.uri});
        }
    }

    render() {
        let { image } = this.state;

        return(
            <View style={styles.containerStyle}>
                {/* <Text style={styles.textStyle}>Image Picker Sample</Text> */}

                <View style={styles.cameraView}>
                    <Button primary
                        onPress={this._takePhoto}>
                        <Text>カメラを起動</Text>
                    </Button>
                </View>

                <View style={styles.cameraView}>
                    <Button success
                        onPress={this._pickImage}>
                        <Text>カメラロールから選択</Text>
                    </Button>
                </View>

                {
                    image &&
                    <View>
                        <Text>撮影画像はこちら</Text>
                        <Image
                            source={{uri: image}}
                            style={{width: 300, height: 300}}
                        />
                    
                        <Card　style={{width: 300, height: 500}}
                            title='撮影画像はこちら'
                            image={{uri: image}}>
                            <Text style={{marginBottom: 10}}>
                                割りと簡単に出せますね。便利かも。長いと勝手に改行されます
                            </Text>
                        </Card>
                    </View>
                }
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cameraView: {
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    textStyle: {
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center',
        marginHorizontal: 15
    }
}

export default ImagePickerSample;