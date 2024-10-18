
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Camera, CameraType } from 'expo-camera/legacy';
import React, { useEffect, useState } from 'react';

export default function App() {

  //console.log(Camera);

  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync()
        setHasPermission(status === "granted")
    })();
  }, [])

  if(hasPermission === null){
    <View/>
  }

  if(hasPermission === false){
    <Text>
      Acesso negado!
    </Text>
  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera
        type={type}
        style={styles.camera}
      >

      </Camera>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    width: "100%",
    height: "100%",
  }
});
