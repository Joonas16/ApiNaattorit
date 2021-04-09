import React from "react";
import {
  Text,
  FlatList,
  View,
  TouchableHighlight,
  StyleSheet,
  Dimensions,
  Image
} from "react-native";
import _ from "lodash";
import AppLoading from 'expo-app-loading';
import { useFonts} from 'expo-font';

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
  var i = 0;
if (Array.isArray(line.run)) {
    const regex = /#{2,}|p{10,}|\*{1,}/;
    return (
      <Text>
        {line.run.map((char, index) => {
          i = i + 1
          if (
            (char.link && char.Text && char.link === char.Text) ||
            char.charcode
          ) {
            return (
              <Text key={index}>
                  {char.fg && char.bg && (
                    <Text
                    onPress={() => { navigation.navigate("Koti", {pageNumber: Number(char.link)}) }}
                      style={{
                        fontWeight: "bold",
                        color: filterOutGraphicalColors(char.fg),
                        backgroundColor: filterOutGraphicalColors(char.bg),
                        fontFamily: 'Inter-SemiBoldItalic',
                        fontSize: 21,
                      }}
                    >
                      {char.link}
                    </Text>
                  )}
              </Text>
            );
          } else if (char.Text && !char.link) {
            const isRegex = char.Text;

            if (!isRegex.match(regex)) {

            // Etusivun otsikko kovakoodi
            //
              if (i == 10 && char.Text.includes("Teksti-TV")) {

                return (
                  
                <Text
                  key={index}
                  style={{
                    color: filterOutGraphicalColors(char.fg),
                    backgroundColor: filterOutGraphicalColors(char.bg),
                    fontWeight: "bold",
                    fontSize: 35,
                    lineHeight: 40,
                    fontFamily: 'Inter-SemiBoldItalic',
                  }}
                >
                  <Image style={styles.tinyLogo} source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Ylen_logo.svg/1200px-Ylen_logo.svg.png',}}/> {char.Text} 
                </Text>)
              }
            //
            // ^^ Etusivun kovakoodaus loppuu
            

              if (char.fg && char.bg) {
                return (
                  <Text
                    key={index}
                    style={{
                      color: filterOutGraphicalColors(char.fg),
                      backgroundColor: filterOutGraphicalColors(char.bg),
                      fontFamily: 'Inter-SemiBoldItalic',
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
  let [fontsLoaded] = useFonts({
    'Inter-SemiBoldItalic': 'https://rsms.me/inter/font-files/Inter-SemiBoldItalic.otf?v=3.12',
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  
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
        style={styles.container}
        keyExtractor={(_item, index) => index.toString()}
        data={uniqueSubPageLines}
        renderItem={({ item }) => <Line navigation={navigation} line={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "102.2%",
    width: Dimensions.get('window').width,
    backgroundColor: "black",
  },
  list: {
    
    width: Dimensions.get('window').width,
    backgroundColor: "black",
  },
  tinyLogo: {
    width: 40,
    height: 40,

  },
  
});

export default SubPages;
