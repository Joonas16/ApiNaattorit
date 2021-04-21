import React, { useContext, useRef } from "react";
import { View, Text, StyleSheet, Dimensions, Animated, FlatList } from "react-native";

import { StateContext } from "../state";
import SubPages from "../components/SubPages";
import { addPage } from "../state/actions";
import teletextService from '../services/teletext'

/**
 * Yhden sivun datan hakeva komponentti.
 * Data haetaan apista Effect-hookilla toistaiseksi renderöinnin alussa,
 * tai silloin kun tilamuuttujassa oleva muuttuja pageNumber muuttuu.
 * Renderöi tekstit riveittäin SubPages-komponentilla.
 */

const { width } = Dimensions.get('screen')

function Page({ navigation }) {
  const { state, dispatch } = useContext(StateContext)
  //const [data, setData] = useState(null)
  

  const onEndReached = async () => {
     const newPage = await teletextService.getPage(Number(state.pages[state.pages.length - 1].nextpg))
    // const newNextPage = await teletextService.getPage(Number(state.nextPage.number) + 1)c
    dispatch(addPage(newPage))
    console.log('end reached')

  }
  const scrollX = useRef(new Animated.Value(0)).current;

  const renderItem = ({ item, index }) => {
    const inputRange = [(index - 1) * width, index * width, (index + 1) * width]
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [width * 0.3, 0, width * 0.3]
    })

    return(
      <View style={{flex: 1}}>
        <Animated.View style={{flex: 1, transform: [{ translateX: scale }]}}>
          <SubPages navigation={navigation} data={item} />
        </Animated.View>
      </View>
      
    )
  }

  const data = state.pages.length ? state.pages : null

  if(!data) return <Text style={styles.loadingText}>Loading...</Text>

  return (
    <View style={styles.container}>
      <Animated.FlatList
        horizontal
        pagingEnabled
        onEndReached={onEndReached}
        initialScrollIndex={data.length === 3 ? 1 : 0}
        onEndReachedThreshold={.5}
        snapToAlignment={"start"}
        snapToInterval={width}
        data={data}
        keyExtractor={(item) => `${item.number}`}
        renderItem={renderItem}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        contentContainerStyle={{paddingBottom: 10}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: "5%",
    flex: 1,
    width: "100%",
    flexGrow: 1,
    backgroundColor: "black",
  },
  loadingText: {
    marginTop: 'auto',
    color: 'white'
  }
});

export default Page;
