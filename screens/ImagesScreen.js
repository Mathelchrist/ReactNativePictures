import * as FileSystem from "expo-file-system";
import React, { useEffect, useState } from "react";
import { StyleSheet, Image, FlatList, Button, View } from "react-native";
import axios from "axios";

export default function ImagesScreen() {

  const [image, setImage] = useState([]);

  useEffect(() => {
    (async () => {
      const images = await FileSystem.readDirectoryAsync(
        FileSystem.cacheDirectory + "ImageManipulator"
      );
      setImage(images);
    })();
  }, []);

  return image.length > 0 ? (

    <FlatList
      data={image}
      keyExtractor={(imagesKey) => imagesKey}
      renderItem={(itemData) => {
        console.log("item", itemData);
        console.log(FileSystem.cacheDirectory + " " + "ImageManipulator/" + " " + itemData.item)
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
                const fetchData = async () => {                         
                data.append('fileData', {
                  name: itemData.item,
                  type: "image/jpeg",
                  uri: Platform.OS === 'ios' ?
                    uri.replace('file://', '')
                    : uri,
                })
                  try {
                    const images = await axios.post("https://wildstagram.nausicaa.wilders.dev/upload", data, {
                      headers: {
                        "Content-Type": "multipart/form-data",
                      },
                    });
                    alert("Image envoyée")
                  } catch {
                    alert("Oh zut ! Il y a un problème !")
                  }
                }
                fetchData();
              }
              }
            ></Button>
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
