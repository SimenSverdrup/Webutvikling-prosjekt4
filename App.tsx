import React, {useContext, useEffect, useState} from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import SearchBar from "./components/SearchBar";
import Title from "./components/Title";
import MovieList from "./components/MovieList";
import { observer } from "mobx-react";
import Paginater from "./components/Paginater";
/*import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { AppLoading } from 'expo';*/

const App = () => {

  /*const [ready, setReady] = useState(false)

  useEffect( () => {
      Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
      }).then(() => {
        setReady(true)
      });
  }, []) //betyr at den kun køres en gang

  if (!ready) {
    return <AppLoading />;
  }*/

    return (
      <View>

        <View style={styles.header}>
          <Title/>
          <SearchBar/>
        </View>
        <View style={styles.container}>
            <MovieList/>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#a998b3',
    marginTop: 23,
  },
});

export default observer(App);