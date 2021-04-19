import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import Page from "../components/Page";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { StateContext } from "../state";
import teletextService from "../services/teletext";
import { setPage, setPageNumber } from "../state/actions";

/**
 * Hakemistot-näkymän komponentti, joka avaa teksti TV:n sivun 199.
 *
 * Renderöi sivun Page-komponentilla.
 */

function Hakemistot({ route, navigation }) {
  const { dispatch } = useContext(StateContext);
  const [input, setInput] = useState(0);

  const searchPage = () => {
    if (Number.isInteger(Number(input))) {
      navigation.navigate("Koti", { pageNumber: Number(input) })
    }
  };

  useEffect(() => {
    teletextService.getPage(199).then(response => {
      dispatch(setPage(response))
      dispatch(setPageNumber(199))
    })
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.page}>
        <Page
          navigation={navigation}
        />
      </View>
      <View style={styles.textInput}>
        <FontAwesomeIcon size={18} icon={faSearch} color="white" />
        <TextInput
          style={{ paddingBottom: 6, color: "white" }}
          fontSize={15}
          keyboardType="numeric"
          selectionColor={"#428AF8"}
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
  page: {
    flex: 15,
  },
});

export default Hakemistot;
