import React, { useState, useEffect, useRef } from 'react';
import ImagesScreen from './ImagesScreen';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { Camera } from 'expo-camera';
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImageManipulator from "expo-image-manipulator";
import { useNavigation } from '@react-navigation/native';

export default function CameraScreen() {
    const cameraRef = useRef(null);
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={type} ref={cameraRef}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            );
                        }}>
                        <Ionicons name="swap-vertical-outline" size={35} color="white" />
                    </TouchableOpacity>
                </View>
                <Button
                    title="Take a picture"
                    onPress={async () => {

                        alert("Sauvegarde en cours...")
                        const pictureMetadata = await cameraRef.current.takePictureAsync();
                        alert("Photo sauvegarder")
                        console.log("pictureMetadata", pictureMetadata);
                        console.log(
                            await ImageManipulator.manipulateAsync(pictureMetadata.uri, [
                                { resize: { width: 800 } },
                            ])
                        );     
                        navigation.navigate('Images')
                    }}
                />
            </Camera>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "center",
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
    },
    button: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
});
