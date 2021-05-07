import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import Page from "../components/Page";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { StateContext } from "../state/index";
import teletextService from '../services/teletext'
import axios from 'axios'
import { setPage, setPageNumber } from "../state/actions";

/**
 * Kotinäkymän komponentti, joka avaa oletuksena teksti TV:n sivun 100.
 * Data haetaan useEffect-hookissa ensimmäisellä renderöinnillä ja silloin, kun propsina saatu sivunumero päivittyy.
 * Renderöi sivun Page-komponentilla.
 */



function Koti({ route, navigation }) {
  const { state, dispatch } = useContext(StateContext)
  const [input, setInput] = useState('');


  const searchPage = async () => {
    const pageNumber = Number(input)
    if (Number.isInteger(pageNumber)) {
      setInput('')
      try {
        const response = await teletextService.getPage(pageNumber)
        dispatch(setPage(response))
        dispatch(setPageNumber(pageNumber))
      } catch (error) {
        console.log(error)
      }

    }
  };

  useEffect(() => {
    dispatch(setPageNumber(route.params.pageNumber));
  }, [route.params]);

  useEffect(() => {

    const source = axios.CancelToken.source()
    teletextService.getPage(state.pageNumber)
      .then(response => dispatch(setPage(response)))

    return () => {
      source.cancel()
    }
  }, [state.pageNumber])


  return (
    <View style={styles.container}>
      <View style={styles.page}>
        {route.params.pageNumber && (
          <Page
            navigation={navigation}
          />
        )}
      </View>

      <View style={styles.textInput}>
        <Text style={styles.pageNumber}>{state.pageNumber}</Text>
        <FontAwesomeIcon size={18} icon={faSearch} color="white" />
        <TextInput
          style={{ paddingBottom: 6, color: "white" }}
          fontSize={15}
          value={input}
          keyboardType="numeric"
          selectionColor="#428AF8"
          keyboardAppearance="dark"
          placeholderTextColor="white"
          placeholder="Sivun haku"
          onChangeText={(number) => setInput(number)}
          onSubmitEditing={() => searchPage()}
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
    backgroundColor: "rgba(0,0,0,0.7)",
    color: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderLeftColor: "gray",
    borderTopColor: "gray",
    borderWidth: 1,
    flex: 0.65,
    marginLeft: "60%"
  },
  pageNumber: {
    color: "white",
  },
  page: {
    flex: 15,
  },
});

export default Koti;
