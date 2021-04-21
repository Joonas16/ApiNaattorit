import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, TextInput, Dimensions} from "react-native";
import Page from "../components/Page";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { StateContext } from "../state/index";
import teletextService from '../services/teletext'
import axios from 'axios'
import { initPages } from "../state/actions";

/**
 * Kotinäkymän komponentti, joka avaa oletuksena teksti TV:n sivun 100.
 *
 * Renderöi sivun Page-komponentilla.
 */

const { width, heigth } = Dimensions.get('screen')
 
function Koti({ route, navigation }) {
  const { state, dispatch } = useContext(StateContext)
  const [input, setInput] = useState('');


  const searchPage = async () => {
    const pageNumber = Number(input)
    if (Number.isInteger(pageNumber)) {
      setInput('')
      try {
        const response = await teletextService.getPage(pageNumber)
        // dispatch(setPage(response))
        // dispatch(setPageNumber(pageNumber))
      } catch (error) {
        console.log(error)
      }

    }
  };

  // useEffect(() => {
  //   dispatch(setPageNumber(route.params.pageNumber));
  // }, [route.params]);

  useEffect(() => {
    console.log('kotijs useeffect run')

    const source = axios.CancelToken.source()
    
    async function init() {
      const currentPage = await teletextService.getPage(route.params.pageNumber)
      let prevPage = null;
      if(currentPage.prevpg) {
        prevPage = await teletextService.getPage(Number(currentPage.prevpg))
      }
      const nextPage = await teletextService.getPage(Number(currentPage.nextpg))

      if(route.params.pageNumber === 100) {
        dispatch(initPages([currentPage, nextPage]))
      } else {
        dispatch(initPages([prevPage, currentPage, nextPage]))
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
            navigation={navigation}
          />
        )}
      </View>

      <View style={styles.textInput}>
        <FontAwesomeIcon size={18} icon={faSearch} color="white" />
        <TextInput
          style={{color: 'white'}}
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
    position: 'absolute',
    backgroundColor: "rgba(0,0,0,0.7)",
    color: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderLeftColor: "gray",
    borderTopColor: "gray",
    borderWidth: 1,
    width: 100,
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
