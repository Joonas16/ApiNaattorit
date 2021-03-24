import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Constants from "expo-constants";
import GestureRecognizer from "react-native-swipe-gestures";

import teletextService from "../services/teletext";
import SubPages from "../components/SubPages";

/**
 * Yhden sivun datan hakeva komponentti.
 * Data haetaan apista Effect-hookilla toistaiseksi renderöinnin alussa,
 * tai silloin kun tilamuuttujassa oleva muuttuja pageNumber muuttuu.
 * Renderöi tekstit riveittäin SubPages-komponentilla.
 */

function Page({ number, setPageNumber, navigation }) {
  const [data, setData] = useState({});

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 160,
  };

  useEffect(() => {
    const fetchPage = async (number) => {
      const response = await teletextService.getPage(number);
      setData(response.teletext.page);
    };
    fetchPage(number);
  }, [number]);

  const nextPage = () => {
    if (data.nextpg) {
      setPageNumber(Number(data.nextpg));
      console.log("Next page:", Number(data.nextpg));
    }
  };
  const prevPage = () => {
    if (data.prevpg) {
      setPageNumber(Number(data.prevpg));
      console.log("Prev page:", Number(data.prevpg));
    }
  };

  if (!Object.keys(data).length) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <GestureRecognizer
        onSwipeLeft={nextPage}
        onSwipeRight={prevPage}
        config={config}
      >
        <SubPages navigation={navigation} data={data} />
      </GestureRecognizer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    width: "100%",
    flexGrow: 1,
    backgroundColor: "#fff",
  },
});

export default Page;
