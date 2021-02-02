import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Hakemistot() {
    return(
        <View style={styles.container}>
            <Text>Hakemistot</Text>
        </View>
    )
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