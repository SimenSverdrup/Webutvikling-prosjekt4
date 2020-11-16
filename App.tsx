import React, {useContext, useState} from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import SearchBar from "./components/SearchBar";
import Title from "./components/Title";
import MovieList from "./components/MovieList";
import { observer } from "mobx-react";
import Paginater from "./components/Paginater";

const App = () => {
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
    backgroundColor: '#759ee0',
    marginTop: 23,
  },
});

export default observer(App);