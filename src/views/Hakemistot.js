import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import Page from "../components/Page";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch} from '@fortawesome/free-solid-svg-icons';

/**
 * Hakemistot-näkymän komponentti, joka avaa teksti TV:n sivun 199.
 *
 * Renderöi sivun Page-komponentilla.
 */

function Hakemistot({ route, navigation }) {
  const [pageNumber, setPageNumber] = useState(null);
  const [input, setInput] = useState(0);

  const searchPage = () => {
    setPageNumber(input);
  };

  useEffect(() => {
    if (route.params) {
      setPageNumber(route.params.pageNumber);
    } else {
      setPageNumber(199);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.page}>
      <Page
        navigation={navigation}
        setPageNumber={setPageNumber}
        number={pageNumber ? pageNumber : 199}
      />
      </View>
      <View style={styles.textInput}>
      <FontAwesomeIcon size={18} icon={ faSearch } color="white"/>
      <TextInput
          style={{paddingBottom: 6, color: "white"}}
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
