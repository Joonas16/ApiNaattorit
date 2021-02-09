import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Constants from "expo-constants";

import teletextService from "../services/teletext";
import SubPages from "../components/SubPages";

/**
 * Yhden sivun datan hakeva komponentti.
 * Data haetaan apista Effect-hookilla toistaiseksi renderöinnin alussa,
 * tai silloin kun tilamuuttujassa oleva muuttuja pageNumber muuttuu.
 * Renderöi tekstit riveittäin SubPages-komponentilla.
 */

function Page({ number }) {
  const [pageNumber] = useState(number);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchPage = async (pageNumber) => {
      const response = await teletextService.getPage(pageNumber);
      setData(response.teletext.page);
    };
    fetchPage(pageNumber);
  }, [pageNumber]);

  if (!Object.keys(data).length) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <SubPages data={data} />
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

export default Page;
