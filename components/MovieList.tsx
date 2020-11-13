import React, {useCallback, useContext, useEffect, useState} from 'react';
import MovieBox from './MovieBox';
import { observer } from 'mobx-react';
import Store from '../mobx/store';
import {Modal, ScrollView, StyleSheet, View} from "react-native";
import {ListItem} from "react-native-elements";
import MovieInfo from "./MovieInfo";


const MovieList = () => {
    const [numberOfMovies, setNumberOfMovies] = useState(5);
    const [movies, setMovies] = useState([]);
    const [genreChoice, setGenre] = useState("");
    const store = useContext(Store);
    const { search_string, genre, sort, page, modalVisible } = store;

    const movieChange = useCallback((json) => {
        setMovies(json);
    }, []);

    const genreChange = useCallback(() => {
        setGenre(genre);
    }, []);

    useEffect( () => {
        if (genre !== "*") {
            let temp_search_string = search_string === "" ? "*" : search_string;
            console.log("update genre")
            fetch("http://it2810-19.idi.ntnu.no:3000/api/movies/genre/" + temp_search_string + '/' + genre + '/' + sort + '/' + page,
                {
                    method: 'GET'
                })
                .then(res => res.json())
                .then(json => {
                    movieChange(json);
                    genreChange();
                })
                .catch(error => {
                    console.log('Could not get movies from DB');
                });
        }
        else {
            if (search_string) {
                // non-empty search string -> search for the specified title
                fetch("http://it2810-19.idi.ntnu.no:3000/api/movies/title/" + search_string + '/' + sort + '/' + page,
                    {
                        method: 'GET'
                    })
                    .then(res => res.json())
                    .then(json => {
                        movieChange(json);
                    })
                    .catch(error => {
                        console.log('Could not get movies from DB');
                    });
            }
            else {
                // empty search string -> get all movies
                fetch("http://it2810-19.idi.ntnu.no:3000/api/movies/" + sort + '/' + page,
                    {
                        method: 'GET'
                    })
                    .then(res => res.json())
                    .then(json => {
                        movieChange(json);
                    })
                    .catch(error => {
                        console.log('Could not get movies from DB');
                    });
            }
        }
        return function cleanup() {}
    }, [search_string, movies, genre, sort, page]);


    return(
        <ScrollView>
            <ScrollView pagingEnabled={true}>
                {movies.map(movie =>
                    <ListItem key={movie["_id"]}>
                        <MovieBox id={movie["_id"]}
                                  title={movie["title"]}
                                  duration={movie["duration"]}
                                  genres={movie["genres"]}
                                  imgUrl={movie["posterurl"]}
                                  year={movie["year"]}
                                  imdbRating={movie["imdbRating"]}
                        />
                    </ListItem>
                )}
            </ScrollView>
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible}>
                    <MovieInfo/>
                </Modal>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30
    },
});

export default observer(MovieList);