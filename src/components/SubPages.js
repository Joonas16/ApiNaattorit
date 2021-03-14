import React, { useState } from "react";
import { Text, FlatList, Button, View, TouchableHighlight } from "react-native";
import { LinearGradient } from "react-native-svg";

/**
 * Flatlistin käyttämä komponentti joka piirtää yhden alisivun rivin.
 *
 * Ottaa propsina: yhden alisivun rivin JSON-datan (Objekti).
 * Palauttaa: Jos rivillä ei ole tekstiä, palauttaa tyhjän rivin, muuten palauttaa tekstiä.
 */

function Line({ line, navigation }) {
 
      if(Array.isArray(line.run)) {
        const regex = /#{2,}|p{10,}|\*{1,}/;
        return <Text>{line.run.map((char, index) => {
          
          if(char.link && char.Text && char.link === char.Text || char.link && !char.Text) {
            return  <Text><TouchableHighlight
            
            key={index}
            underlayColor="blue"
            onPress={() => {
              navigation.navigate("Koti", {
                pageNumber: Number(char.link),
              });
            }}
          >
           <Text>{char.link}</Text>
          </TouchableHighlight></Text>

          } else if(char.Text && !char.link) {
            const apuTeksti = char.Text;
            if (!apuTeksti.match(regex)) { 
              return char.Text
            }
        } else if(char.length === 1 && !char.Text) {
          console.log(char.Text);
          return ' '
        }
      })}</Text>
      }
      return null
}

// 	" 201 URHEILU  350 RADIOT 470 VEIKKAUS "
/* 
type: "structred" -> subpage[subPageIndex].content[2].line.run[index]
ensimmäinen link: "199"
siitä seuraava run[index] halutaan Text
*/


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

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 10,
        }}
      />
    );
  };
  };
  
  return (
    <View>
      <FlatList
        style={{ flex: 1 }}
        keyExtractor={(_item, index) => index.toString()}
        data={data.subpage[subPageIndex].content[2].line}
        renderItem={({ item }) => <Line navigation={navigation} line={item} />}
        // renderItem={({ item }) => <Text>{item.Text}</Text>}
        //ItemSeparatorComponent={listSeparator}
      />
      <Button title="Seuraava alasivu >" onPress={() => changePage(1)} />
      <Button title="< Edellinen alasivu" onPress={() => changePage(-1)} />
    </View>
  );
}

export default SubPages;
