import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput, Button, Text } from "react-native";
import Page from "../components/Page";

/**
 * Kotinäkymän komponentti, joka avaa oletuksena teksti TV:n sivun 100.
 * 
 * Renderöi sivun Page-komponentilla.
 */

function Koti({ route, navigation }) {
  const [pageNumber, setPageNumber] = useState(undefined);
  const [input, setInput] = useState(0)

  const searchPage = () => {
    setPageNumber(input)
  }

  useEffect(() => {
    setPageNumber(route.params.pageNumber);
  }, [route.params]);

 
    return (
      <View style={styles.container}>
        {pageNumber && <Page navigation={navigation} number={pageNumber} />}
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

export default Koti;
