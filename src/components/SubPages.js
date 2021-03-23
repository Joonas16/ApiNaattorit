import React, { useState } from "react";
import { Text, FlatList, Button, View, TouchableHighlight, StyleSheet } from "react-native";
import { LinearGradient } from "react-native-svg";
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

/**
 * Flatlistin käyttämä komponentti joka piirtää yhden alisivun rivin.
 * 
 * Ottaa propsina: Yhden alasivun rivin JSON-datan (line) navigaatio-objektin (navigation).
 * Palauttaa: Yhden rivin merkistöstä tekstisisällöt ja link
t */

function Line({ line, navigation }) {
 
      if(Array.isArray(line.run)) {
        const regex = /#{2,}|p{10,}|\*{1,}/;
        return <Text>{line.run.map((char, index) => {
          
          if(char.link && char.Text && char.link === char.Text || char.charcode) {
            return  <Text key={index}><TouchableHighlight
              key={index}
              underlayColor="blue"
              onPress={() => {
                navigation.navigate("Koti", {
                  pageNumber: Number(char.link),
                });
              }}
              >
              {
                (char.fg && char.bg) &&
                <Text style={{ color: char.fg, backgroundColor: char.bg, fontSize: 20 }}>{char.link}</Text>
              }
          </TouchableHighlight></Text>

          } else if(char.Text && !char.link) {
            const isRegex = char.Text;
            if (!isRegex.match(regex)) { 
              if (char.fg && char.bg) {
                //if (char.size) {
                  //return <Text style={{ color: char.fg, backgroundColor: char.bg, fontSize: 20}}>{char.Text}</Text>;
                //} else {
                  return <Text style={{ color: char.fg, backgroundColor: char.bg}}>{char.Text}</Text>;
                //}
              } else {
                return char.Text;
              }
            }
        } else if(char.length === 1 && !char.Text) {
          console.log(char.Text);
          return ' '
        }
      })}</Text>
      }
      return null
}




/**
 * Renderöi toistaiseksi vain sivun ensimmäisen alasivun FlatList-komponentilla rivi kerrallaan
 * ("structured")-tyypin dataa
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
  }
  return (
    <View style={styles.container}>
      
        <FlatList
          style={styles.list}
          keyExtractor={(_item, index) => index.toString()}
          data={data.subpage[subPageIndex].content[2].line}
          renderItem={({ item }) => <Line navigation={navigation} line={item} />}
        />    
      {/*
      <Button title="Seuraava alasivu >" onPress={() => changePage(1)} />
      <Button title="< Edellinen alasivu" onPress={() => changePage(-1)} />
      onEndReached={() => changePage(1)}
      onEndReachedThreshold={.9}
       */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      width: '100%',
      height: '100%'
  },
  list: {
    width: '100%',
    backgroundColor: 'black'
  },
  link: {
    fontSize: 25
  }
});

export default SubPages;
