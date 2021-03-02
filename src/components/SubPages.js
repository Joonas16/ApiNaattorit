import React, { useState } from "react";
import { Text, FlatList, Button, View, TouchableHighlight } from "react-native";

/**
 * Flatlistin käyttämä komponentti joka piirtää yhden alisivun rivin.
 *
 * Ottaa propsina: yhden alisivun rivin JSON-datan (Objekti).
 * Palauttaa: Jos rivillä ei ole tekstiä, palauttaa tyhjän rivin, muuten palauttaa tekstiä.
 */

function Line({ line, navigation }) {
  const renderLine = (line) => {
    return line.split(/(?=\d{3})/g).map((item, index) => {
      if (/\d{3}/g.test(item.substr(0, 3))) {
        //Palauta touchableopacity (linkki)
        const linkPageNumber = item.substr(0, 3);
        return (
          <Text key={index}>
            <TouchableHighlight
              underlayColor="blue"
              onPress={() => {
                console.log("Siirry sivulle " + linkPageNumber);
                navigation.navigate("Selaa", {
                  pageNumber: Number(linkPageNumber),
                });
              }}
            >
              <Text>{item.substr(0, 3)}</Text>
            </TouchableHighlight>
            {" " + item.substr(4, item.length - 1)}
          </Text>
        );
      } else {
        //Palauta tekstiä
        return <Text key={index}>{item}</Text>;
      }
    });
  };

  if (!line.Text) return <Text>{"\n"}</Text>;

  return line && renderLine(line.Text);
}

/**
 * Renderöi toistaiseksi vain sivun ensimmäisen alisivun FlatList-komponentilla rivi kerrallaan
 * Jos muuttujan subPageIndex arvoa muuttaa, näkyvän datan pitäisi vaihtua
 */

function SubPages({ data, navigation }) {
  const [subPageIndex, setSubPageIndex] = useState(0);

  const changePage = (accumulator) => {
    if (accumulator === 1 && subPageIndex < data.subpage.length - 1) {
      setSubPageIndex(subPageIndex + accumulator);
    } else if (accumulator === -1 && subPageIndex > 0) {
      setSubPageIndex(subPageIndex + accumulator);
    }
  };

  return (
    <View>
      <FlatList
        style={{ flex: 1 }}
        keyExtractor={(_item, index) => index.toString()}
        data={data.subpage[subPageIndex].content[0].line}
        renderItem={({ item }) => <Line navigation={navigation} line={item} />}
      />
      <Button title="Seuraava alasivu >" onPress={() => changePage(1)} />
      <Button title="< Edellinen alasivu" onPress={() => changePage(-1)} />
    </View>
  );
}

export default SubPages;
