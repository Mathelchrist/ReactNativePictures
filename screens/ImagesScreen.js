import * as FileSystem from "expo-file-system";
import React, { useEffect, useState } from "react";
import { StyleSheet, Image, FlatList, Button, View } from "react-native";
import axios from "axios";

export default function ImagesScreen() {
  const [refresh, setRefresh] = useState(false);
  const [image, setImage] = useState([]);
  const reload = async () => {
    setRefresh(true);
    const images = await FileSystem.readDirectoryAsync(
      FileSystem.cacheDirectory + "ImageManipulator"
    );
    setImage(images);
    setRefresh(false);
  }
  useEffect(() => {
   reload()
    }, []);

  return image.length > 0 ? (

    <FlatList
      data={image}
      keyExtractor={(imagesKey) => imagesKey}
      onRefresh={reload}
      refreshing={refresh}
      renderItem={(itemData) => {
        console.log("item", itemData.item);
        return (
          <View>
            <Image
              style={styles.image}
              source={{
                uri:
                  FileSystem.cacheDirectory + "ImageManipulator/" + itemData.item,
              }}
            />
            <Button
              title="ENVOYER"
              onPress={() => {
                const data = new FormData();
                const uri = FileSystem.cacheDirectory + "ImageManipulator/" + itemData.item;
                const sendData = async () => {
                  data.append('fileData', {
                    name: itemData.item,
                    type: "image/jpeg",
                    uri: Platform.OS === 'ios' ?
                      uri.replace('file://', '')
                      : uri,
                  })
                  try {
                     await axios.post("https://wildstagram.nausicaa.wilders.dev/upload", data, {
                      headers: {
                        "Content-Type": "multipart/form-data",
                      },
                    });
                    alert("Image envoyée")
                    console.log(data)
                  } catch (err) {
                    alert("Oh zut ! Il y a un problème : ")
                    console.log(err);
                  }
                }
                sendData();
              }
              }
            ></Button>
            <Button
              title="SUPPRIMER"
              color="red"
              onPress={() => {
                const imgDir = FileSystem.cacheDirectory + "ImageManipulator/" + itemData.item;
                const deletData = async () => {
                  try {
                    await FileSystem.deleteAsync(imgDir);
                    alert("Image supprimée")
                  } catch {
                    alert("Oh zut ! Il y a un problème : ")
                  }
              }
              deletData();
              }
            }
            >


            </Button>
          </View >
        );
      }}
    />
  ) : null;
}

const styles = StyleSheet.create({
  image: {
    resizeMode: "cover",
    height: 500,
  },
});
