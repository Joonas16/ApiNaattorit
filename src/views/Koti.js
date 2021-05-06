import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import Page from "../components/Page";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { StateContext } from "../state/index";
import teletextService from '../services/teletext'
import axios from 'axios'
import { initPages } from "../state/actions";

/**
 * Kotinäkymän komponentti, joka avaa oletuksena teksti TV:n sivun 100.
 * Renderöi sivun Page-komponentilla.
 */

function Koti({ route, navigation }) {
  const { state, dispatch } = useContext(StateContext)
  const [input, setInput] = useState('');

  const flatListRef = React.useRef()

  const searchPage = () => {
    const newPage = Number(input)
    if (Number.isInteger(newPage)) {
      setInput('')
      try {
        navigation.navigate("Koti", {pageNumber: newPage})
      } catch (error) {
        console.log(error)
      }

    }
  };

  useEffect(() => {
    const source = axios.CancelToken.source()

    async function init() {
      console.log('init pages called, currentpg:', route.params.pageNumber)
      const currentPage = await teletextService.getPage(route.params.pageNumber)
      
      let nextPage = undefined
      
      if (currentPage.nextpg) {
        nextPage = await teletextService.getPage(Number(currentPage.nextpg))
      }
      
      if (currentPage && nextPage) {
        dispatch(initPages([currentPage, nextPage]))
      } else {
        dispatch(initPages([currentPage]))
      }
    }

    init()

    return () => {
      source.cancel()
    }
  }, [route.params])


  return (
    <View style={styles.container}>
      <View style={styles.page}>
        {route.params.pageNumber && (
          <Page
            flatListRef={flatListRef}
            navigation={navigation}
          />
        )}
      </View>

      <View style={styles.textInput}>
      <Text style={styles.pageNumber}>100</Text>
        <FontAwesomeIcon size={18} icon={faSearch} color="white" />
        <TextInput
          style={{ color: 'white' }}
          fontSize={15}
          value={input}
          keyboardType="numeric"
          selectionColor="#428AF8"
          keyboardAppearance="dark"
          placeholderTextColor="white"
          placeholder="Sivun haku"
          onChangeText={(number) => setInput(number)}
          onSubmitEditing={searchPage}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "black",
  },
  textInput: {
    position: 'absolute',
    backgroundColor: "rgba(0,0,0,0.7)",
    color: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderLeftColor: "gray",
    borderTopColor: "gray",
    borderWidth: 1,
    width: 140,
    height: 30,
    bottom: 0,
    right: 0
  },
  pageNumber: {
    color: "white",
  },
  page: {
    flex: 1,
  },
});

export default Koti;
