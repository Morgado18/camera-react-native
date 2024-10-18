
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Modal, Image } from 'react-native';
import { Camera } from 'expo-camera/legacy';
import React, { useEffect, useState, useRef } from 'react';
import { FontAwesome } from "@expo/vector-icons";

export default function App() {

  //console.log(Camera);
  const camRef = useRef(null)
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHasPermission] = useState(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null)
  const [open, setOpen] = useState(false)

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

  async function takePicture(){
    if(camRef){
      const data = await camRef.current.takePictureAsync()
      setCapturedPhoto(data.uri)
      setOpen(true)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera
        type={type}
        style={styles.camera}
        ref={camRef}
      >
        <View style={styles.contentButtons}>
          <TouchableOpacity
            style={styles.buttonFlip}
            onPress={ () => {
              setType(
                type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back
              )
            } }
          >
            <FontAwesome
              name='exchange' color="red" size={23}
            ></FontAwesome>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonCamera}
            onPress={ takePicture }
          >
            <FontAwesome
              name='camera' color="#fff" size={23}
            ></FontAwesome>
          </TouchableOpacity>
        </View>
      </Camera>
      {capturedPhoto &&(
        <Modal
          animationType='slide'
          transparent={true}
          visible={open}
        >
          <View style={styles.contentModal}>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={()=>{setOpen(false)}}
            >
             <FontAwesome name='close' size={50} color="#fff"></FontAwesome>
            </TouchableOpacity>
            <Image style={styles.imgPhoto} source={ {uri:capturedPhoto} }/>
          </View>
        </Modal>
      )}
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
  },
  contentButtons: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
  },
  buttonFlip: {
    position: "absolute",
    bottom: 50,
    left: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 20,
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  buttonCamera: {
    position: "absolute",
    bottom: 50,
    right: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    margin: 20,
    width: 50,
    height: 50,
    borderRadius: 50,
  }, 
  contentModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    margin: 20,
  },
  imgPhoto: {
    width: "100%",
    height: 400
  },
  closeBtn: {
    position: "absolute",
    top: 10,
    left: 2,
    margin: 10,
  }
});
