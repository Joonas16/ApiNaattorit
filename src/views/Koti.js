import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput} from "react-native";
import Page from "../components/Page";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch} from '@fortawesome/free-solid-svg-icons';

/**
 * Kotinäkymän komponentti, joka avaa oletuksena teksti TV:n sivun 100.
 *
 * Renderöi sivun Page-komponentilla.
 */

function Koti({ route, navigation }) {
  const [pageNumber, setPageNumber] = useState(undefined);
  const [input, setInput] = useState(0);

  const searchPage = () => {
    setPageNumber(input);
  };

  useEffect(() => {
    setPageNumber(route.params.pageNumber);
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.page}>
        {pageNumber && (
          <Page
            navigation={navigation}
            setPageNumber={setPageNumber}
            number={pageNumber}
          />
        )}
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

export default Koti;
