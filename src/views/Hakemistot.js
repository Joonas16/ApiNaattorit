import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput, Button, Text } from "react-native";
import Page from "../components/Page";

/**
 * Hakemistot-näkymän komponentti, joka avaa teksti TV:n sivun 199.
 * 
 * Renderöi sivun Page-komponentilla.
 */

function Hakemistot({ route, navigation }) {
  const [pageNumber, setPageNumber] = useState(null);
  const [input, setInput] = useState(0)

  const searchPage = () => {
    setPageNumber(input)
  }

  useEffect(() => {
    if(route.params) {
      setPageNumber(route.params.pageNumber);
    } else  {
      setPageNumber(199)
    }
    
  }, [route.params]);

 
    return (
      <View style={styles.container}>
        <Page navigation={navigation} number={pageNumber ? pageNumber : 199} />
        <View>
          <TextInput style={styles.textInput} placeholderTextColor='white' placeholder='Hae sivu numerolla:' onChangeText={(number) => setInput(number)} onSubmitEditing={searchPage}/>
        </View>
      </View>
    );
  
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    backgroundColor: 'gray',
    color: 'white'
  }
});

export default Hakemistot;
