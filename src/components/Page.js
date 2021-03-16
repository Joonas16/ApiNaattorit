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

function Page({ number, navigation }) {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchPage = async (number) => {
      const response = await teletextService.getPage(number);
      setData(response.teletext.page);
    };
    fetchPage(number);
  }, [number]);

  if (!Object.keys(data).length) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <SubPages navigation={navigation} data={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    width: '100%',
    flexGrow: 1,
    backgroundColor: "#fff",
  },
});

export default Page;
