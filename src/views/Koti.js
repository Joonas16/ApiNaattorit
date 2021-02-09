import React from "react";
import { View, StyleSheet } from "react-native";
import Constants from 'expo-constants';

import Page from "../components/Page";

/**
 * Kotinäkymän komponentti, joka avaa oletuksena teksti TV:n sivun 100.
 * 
 * Renderöi sivun Page-komponentilla.
 */

function Koti() {
  return (
    <View style={styles.container}>
      <Page number={100} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default Koti;
