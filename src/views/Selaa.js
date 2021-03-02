import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Page from "../components/Page";

/**
 * Sää-näkymän komponentti, joka avaa teksti TV:n sivun 400.
 *
 * Renderöi sivun Page-komponentilla.
 */

function Selaa({ route, navigation }) {
  const [pageNumber, setPageNumber] = useState(route.params.pageNumber);

  useEffect(() => {
    setPageNumber(route.params.pageNumber);
  }, [route.params.pageNumber]);

  if (pageNumber) {
    return (
      <View style={styles.container}>
        <Page navigation={navigation} number={pageNumber} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Page number={400} />
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
});

export default Selaa;
