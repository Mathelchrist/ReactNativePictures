import React from "react";
import { StyleSheet, Image, FlatList, Button, View } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";

export default function FeedScreen() {
  const [image, setImage] = useState([]);                     // initialisation du useState pour le dynamique 
  useEffect(() => {                                           // faire qu'une execution de cette methode (tableau vide au 2eme paramettre de useEffect)
    const fetchData = async () => {                           // methode asynchrone pour continuer le code en demandant une réponse d'un serveur, attend que la demande soit retourner
      try {
        const images = await axios.get("https://wildstagram.nausicaa.wilders.dev/list"); // recuperation de l'api
        setImage(images.data);                                       // on recupere les data de l'api dans un tableau grace a useState
      } catch (err) {
        console.log(err)
      }
    }
    fetchData();                                              // on appel la function qui recupere les données
  }, []);
  return (

    <FlatList
      data={image}
      keyExtractor={(imagesKey) => imagesKey}
      renderItem={(itemData) => {
        console.log("item reçu : ", itemData.item);
        return (
          <View>
            <Image
              style={styles.image}
              source={{
                uri:
                  "https://wildstagram.nausicaa.wilders.dev/files/" + itemData.item,
              }}
            />

          </View >
        );
      }}
    />
  )
}

const styles = StyleSheet.create({
  image: {
    resizeMode: "cover",
    height: 250,
  },
});