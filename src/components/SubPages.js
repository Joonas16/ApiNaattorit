import React from "react";
import {
  Text,
  FlatList,
  View,
  TouchableHighlight,
  StyleSheet,
} from "react-native";
import _ from "lodash";

/**
 * Flatlistin käyttämä komponentti joka piirtää yhden alisivun rivin.
 * 
 * Ottaa propsina: Yhden alasivun rivin JSON-datan (line) navigaatio-objektin (navigation).
 * Palauttaa: Yhden rivin merkistöstä tekstisisällöt ja link
t */

function Line({ line, navigation }) {
  function filterOutGraphicalColors(color) {
    switch (color) {
      case "gwhite":
        return "white";
      case "gblack":
        return "black";
      case "gred":
        return "red";
      case "ggreen":
        return "green";
      case "gyellow":
        return "yellow";
      case "gblue":
        return "blue";
      case "gmagenta":
        return "magenta";
      case "gcyan":
        return "cyan";
      default:
        return color;
    }
  }

  if (Array.isArray(line.run)) {
    const regex = /#{2,}|p{10,}|\*{1,}/;
    return (
      <Text>
        {line.run.map((char, index) => {
          if (
            (char.link && char.Text && char.link === char.Text) ||
            char.charcode
          ) {
            return (
              <Text key={index}>
                <TouchableHighlight
                  underlayColor="blue"
                  onPress={() => {
                    navigation.navigate("Koti", {
                      pageNumber: Number(char.link),
                    });
                  }}
                >
                  {char.fg && char.bg && (
                    <Text
                      style={{
                        color: filterOutGraphicalColors(char.fg),
                        backgroundColor: filterOutGraphicalColors(char.bg),
                        fontSize: 20,
                      }}
                    >
                      {char.link}
                    </Text>
                  )}
                </TouchableHighlight>
              </Text>
            );
          } else if (char.Text && !char.link) {
            const isRegex = char.Text;
            if (!isRegex.match(regex)) {
              if (char.fg && char.bg) {
                return (
                  <Text
                    key={index}
                    style={{
                      color: filterOutGraphicalColors(char.fg),
                      backgroundColor: filterOutGraphicalColors(char.bg),
                    }}
                  >
                    {char.Text}
                  </Text>
                );
              } else {
                return char.Text;
              }
            }
          } else if (char.length === 1 && !char.Text) {
            console.log(char.Text);
            return " ";
          }
        })}
      </Text>
    );
  }
  return null;
}

/**
 * Renderöi toistaiseksi vain sivun ensimmäisen alasivun FlatList-komponentilla rivi kerrallaan
 * ("structured")-tyypin dataa
 * Jos muuttujan subPageIndex arvoa muuttaa, näkyvän datan pitäisi vaihtua
 */

function SubPages({ data, navigation }) {
  const subPageLines = data.subpage
    .map((subpage) => subpage.content[2].line)
    .reduce(
      (subPageArray, currentSubPage) => subPageArray.concat(currentSubPage),
      []
    );

  const uniqueSubPageLines = _.uniqWith(subPageLines, _.isEqual);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        keyExtractor={(_item, index) => index.toString()}
        data={uniqueSubPageLines}
        renderItem={({ item }) => <Line navigation={navigation} line={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  list: {
    width: "100%",
    backgroundColor: "black",
  },
  link: {
    fontSize: 25,
  },
});

export default SubPages;
