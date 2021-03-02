import React from 'react';
import { View, StyleSheet } from 'react-native';
import Page from '../components/Page';

/**
 * Hakemistot-näkymän komponentti, joka avaa teksti TV:n sivun 199.
 * 
 * Renderöi sivun Page-komponentilla.
 */

function Hakemistot({navigation}) {
    return(
        <View style={styles.container}>
            <Page navigation={navigation} number={199} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default Hakemistot;