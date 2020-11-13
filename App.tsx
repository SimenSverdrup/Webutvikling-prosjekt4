import React from 'react';
import { StyleSheet, View } from 'react-native';
import SearchBar from "./components/SearchBar";
import Title from "./components/Title";
import MovieList from "./components/MovieList";


export default function App() {
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
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',

  },
  header: {
    backgroundColor: '#759ee0',
    marginTop: 23,
  }
});
