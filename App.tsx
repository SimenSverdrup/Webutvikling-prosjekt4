import React from 'react';
import { StyleSheet, View } from 'react-native';
import SearchBar from "./components/SearchBar";
import Title from "./components/Title";


export default function App() {
  return (
        <View style={styles.header}>
          <Title/>
          <SearchBar/>
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
  header: {
    backgroundColor: '#759ee0',
    marginTop: 23,
  }
});
