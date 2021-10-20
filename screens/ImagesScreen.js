import * as FileSystem from "expo-file-system";

import React, { useEffect, useState } from "react";

import { StyleSheet, Image, FlatList } from "react-native";


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
      keyExtractor={(imageURI) => imageURI}
      renderItem={(itemData) => {
        console.log("item", itemData);
        return (
          <Image
            style={styles.image}
            source={{
              uri:
                FileSystem.cacheDirectory + "ImageManipulator/" + itemData.item,
            }}
          />
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
