import React from "react";
import { View, StyleSheet } from "react-native";
//import Constants from 'expo-constants';

import Page from "../components/Page";

/**
 * Kotinäkymän komponentti, joka avaa oletuksena teksti TV:n sivun 100.
 * 
 * Renderöi sivun Page-komponentilla.
 */

function Koti({ navigation}) {

  return (
    <View style={styles.container}>
      <Page navigation={navigation} number={100} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Koti;
