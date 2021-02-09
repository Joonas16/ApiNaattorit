import React, { useState } from "react";
import { Text, FlatList } from "react-native";

/**
 * Flatlistin käyttämä komponentti joka piirtää yhden alisivun rivin.
 *
 * Ottaa propsina: yhden alisivun rivin JSON-datan (Objekti).
 * Palauttaa: Jos rivillä ei ole tekstiä, palauttaa tyhjän rivin, muuten palauttaa tekstiä.
 */

function Line({ line }) {
  if (!line.Text) return <Text>{"\n"}</Text>;
  return <Text style={{ color: "black" }}>{line && line.Text}</Text>;
}

/**
 * Uudelleenkäytettävä komponentti, jota voidaan käyttää renderöimään yhden sivun dataa.
 *
 * Ottaa propsina: yhden sivun JSON-datan (Objekti).
 * Renderöi toistaiseksi vain sivun ensimmäisen alisivun FlatList-komponentilla rivi kerrallaan
 * Jos muuttujan subPageIndex arvoa muuttaa, näkyvän datan pitäisi vaihtua
 */

function SubPages({ data }) {
  const [subPageIndex] = useState(0);

  console.log(data.subpage[subPageIndex].content[0].line);

  return (
    <FlatList
      style={{ flex: 1 }}
      keyExtractor={(_item, index) => index.toString()}
      data={data.subpage[subPageIndex].content[0].line}
      renderItem={({ item }) => <Line line={item} />}
    />
  );
}

export default SubPages;
