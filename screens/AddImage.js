import React, { Component } from 'react';
import { View, Image, CameraRoll } from 'react-native';
// Text, Button,
import { Container, Content, Button, Text } from 'native-base';
import { ImagePicker } from 'expo';
import { Card, ListItem,Icon,Header } from 'react-native-elements'

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
            <View　style={{flex:1}}>
                <View>
                    <Header
                        statusBarProps={{ barStyle: 'light-content' }}
                        backgroundColor="deepskyblue"
                        leftComponent={{
                            icon: 'close',
                            color: 'white',
                            onPress: () => {
                                this.props.navigation.navigate('home');
                            }
                        }}
                        centerComponent={{ text: 'Add', style: styles.headerStyle }}
                    />
                </View>
                
                <View style={styles.container} >
                        <Button primary
                            style={styles.cameraView}
                            onPress={this._takePhoto}>
                            <Text>カメラを起動</Text>
                        </Button>
    
                        <Button success
                            style={styles.cameraView}
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
                    </View>
                }
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'red'
    },
    headerStyle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
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