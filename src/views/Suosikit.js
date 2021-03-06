import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, FlatList, Alert } from "react-native";
import { Input, ListItem, Button, Overlay } from "react-native-elements";
import * as SQLite from "expo-sqlite";
import { StateContext } from "../state";
  
export default function Suosikit({ navigation }) {
  let isnum = /^\d+$/.test(pagenumber);
  const { state } = useContext(StateContext)
  const [name, setName] = useState("");
  const [pagenumber, setPagenumber] = useState('');
  const [favouriteList, setFavouriteList] = useState([]);
  const db = SQLite.openDatabase("favouritelistdb.db");
  const [visible, setVisible] = useState(false);
  const [deleteName, setDeleteName] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [deletePagenumber, setDeletepagenumber] = useState("");

  const toggleOverlay = (name, id, pagenumber) => {
    setVisible(!visible);
    setDeleteName(name);
    setDeleteId(id);
    setDeletepagenumber(pagenumber);
  };

  useEffect(() => {
    setName(state.page.name)
    setPagenumber(state.page.number)
  }, [state]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists favourite (id integer primary key not null, name text, pagenumber number);"
      );
    });
    updateList();
  }, []);

  const saveItem = () => {

    // Alert jos nimi tai sivunumero ei ole oikein
    if (name == '') {
      alert('Sivun nimi ei voi olla tyhjä')
      setName(name)
      setPagenumber(pagenumber)
    } else if (pagenumber == ''){
      alert('Sivunumero ei voi olla tyhjä')
      setName(name)
      setPagenumber(pagenumber)
    }
    else if (!pagenumber.match(/^[0-9]+$/)){
      alert('Sivunumero voi sisältää vain numeroita!')
      setName(name)
      setPagenumber(pagenumber)
    } else if (pagenumber.length > 3){
      alert('Sivunumero voi olla maksimissaan 3 numeroa')
      setName(name)
      setPagenumber(pagenumber)
    } 
     else {

    db.transaction(
      (tx) => {
        tx.executeSql(
          "insert into favourite (name, pagenumber) values (?, ?);",
          [name, parseInt(pagenumber)]
        );
      },
      null,
      updateList
    );
    setName('')
    setPagenumber('')
  };
}

  const updateList = () => {
    db.transaction((tx) => {
      tx.executeSql("select * from favourite;", [], (_, { rows }) =>
        setFavouriteList(rows._array)
      );
    });
  };

  const deleteItem = (id) => {
    db.transaction(
      (tx) => {
        tx.executeSql(`delete from favourite where id = ?;`, [id]);
      },
      null,
      updateList
    );
    toggleOverlay();
  };

  const renderItem = ({ item }) => (
    <ListItem
      onLongPress={() => toggleOverlay(item.name, item.id, item.pagenumber)}
      style={styles.listItem}
      bottomDivider
    >
      <ListItem.Content>
        <ListItem.Title style={styles.title}>{item.name}</ListItem.Title>
        <ListItem.Subtitle style={styles.subTitle}>
          {item.pagenumber}
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron
        size={35}
        color="#c3c3c3"
        onPress={() => navigation.navigate("Koti", { pageNumber: item.pagenumber })}
      />
    </ListItem>
  );

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "95%", marginTop: 15 }}
        keyExtractor={(item) => item.id.toString()}
        data={favouriteList}
        renderItem={renderItem}
      />

      <View style={styles.inputContainer}>
        <View style={styles.inputGroup}>
          <Input
            style={styles.input}
            containerStyle={{ marginTop: 10, width: "54%" }}
            placeholder="Type name"
            label="NAME"
            onChangeText={(name) => setName(name)}
            value={name}
          />
          <Input
            style={styles.input}
            containerStyle={{ marginTop: 10, width: "50%" }}
            placeholder="Type pagenumber"
            keyboardType="numeric"
            label="PAGENUMBER"
            onChangeText={(number) => setPagenumber(number)}
            value={pagenumber}
          />
        </View>
        <Button
          titleStyle={{ fontSize: 20 }}
          buttonStyle={styles.button}
          icon={{ name: "star", color: "white" }}
          onPress={saveItem}
          title="ADD TO FAVOURITES"
        />
      </View>
      <Overlay
        overlayStyle={styles.overlay}
        isVisible={visible}
        onBackdropPress={toggleOverlay}
      >
        <View style={styles.overlayTextGroup}>
          <Text style={{ fontSize: 15 }}>Are you sure you want to delete</Text>
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>
            {deleteName}{" "}
            <Text style={{ fontSize: 15, fontWeight: "normal", color: "gray" }}>
              {deletePagenumber}
            </Text>
          </Text>
        </View>
        <View style={styles.overlayButtonGroup}>
          <Button
            type="outline"
            titleStyle={{ fontSize: 15 }}
            title="Cancel"
            onPress={() => setVisible(!visible)}
          />
          <Button
            titleStyle={{ fontSize: 15 }}
            title="Yes"
            onPress={() => deleteItem(deleteId)}
          />
        </View>
      </Overlay>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: "5%",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  inputGroup: {
    display: "flex",
    color: "white",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",

  },
  inputContainer: {
    display: "flex",
    width: "90%",
  },
  button: {
    width: "100%",
    backgroundColor: "#11cdde",
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
  },
  subTitle: {

    fontSize: 13,
  },
  listItem: {
    borderBottomWidth: 0.6,
    borderBottomColor: "#c3c3c3",
  },
  input: {
    color: "white"
  },
  overlay: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "30%",
    width: "60%",
  },
  overlayTextGroup: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "50%",
  },
  overlayButtonGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    width: "70%",
    marginTop: 15,
  },
});
