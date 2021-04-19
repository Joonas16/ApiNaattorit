import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";

import { StateContext } from "../state";
import SubPages from "../components/SubPages";
import { setPageNumber } from "../state/actions";

/**
 * Yhden sivun datan hakeva komponentti.
 * Data haetaan apista Effect-hookilla toistaiseksi renderöinnin alussa,
 * tai silloin kun tilamuuttujassa oleva muuttuja pageNumber muuttuu.
 * Renderöi tekstit riveittäin SubPages-komponentilla.
 */

function Page({ navigation }) {
  const { state, dispatch } = useContext(StateContext)

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 160,
  };

  const nextPage = () => {
    if (state.page.nextpg) {
      dispatch(setPageNumber(Number(state.page.nextpg)))
      console.log("Next page:", Number(state.page.nextpg));
    }
  };
  const prevPage = () => {
    if (state.page.prevpg) {
      dispatch(setPageNumber(Number(state.page.prevpg)))
      console.log("Prev page:", Number(state.page.prevpg));
    }
  };

  if (Object.entries(state.page).length === 0) return <Text style={styles.loadingText}>Loading...</Text>;

  return (
    <View style={styles.container}>
      <GestureRecognizer
        onSwipeLeft={nextPage}
        onSwipeRight={prevPage}
        config={config}
      >
        <SubPages navigation={navigation} data={state.page} />
      </GestureRecognizer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: "5%",
    flex: 1,
    width: "100%",
    flexGrow: 1,
    backgroundColor: "black",
  },
  loadingText: {
    marginTop: 'auto',
    color: 'white'
  }
});

export default Page;
