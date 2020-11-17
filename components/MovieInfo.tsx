import React, {useCallback, useContext, useEffect, useState} from 'react';
import { observer } from "mobx-react"
import Store from '../mobx/store'
import {Button, Image, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity} from "react-native";
import {Icon} from 'native-base';


const initialMovie = {
    _id: "",
    title: "",
    duration: "",
    genres: ["", ""],
    year: "",
    actors: ["", ""],
    storyline: "",
    imdbRating: "",
    userRating: "",
    posterurl: ""
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContainer: {
        backgroundColor: 'white',
        flex: 1,
        flexDirection: "column",
        marginTop: 20,
    },
    image: {
        width: 230,
        height: 340,
    },
    text: {
        lineHeight: 25,
    },
    rating: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 10,
        marginBottom: 50
    },
    header: {
        fontSize: 25,
        fontWeight: "bold",
        marginBottom: 15,
    },
    input: {
        borderStyle: "solid",
        borderRadius:  5,
        backgroundColor: "#ebebeb",
        marginTop: 20,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 18,
    },
    textarea: {
        fontSize: 18,
        left: 20,
        right: 20,
        marginRight: 30,
        marginTop: 20,
        width: 320,
        backgroundColor: "#dcd3de",
        borderRadius: 8,
        padding: 15,
    },
    icon: {
        padding: 0,
        marginLeft: 20,
        marginTop: 5,
    }
});

const MovieInfo = () => {
    const store = useContext(Store);
    const { select_id, updateModalVisible, modalVisible } = store;
    const [id, setId] = useState(select_id);
    const [movie, setMovie] = useState(initialMovie);
    const [userRating, setUserRating] = useState("");

    let duration = "Unknown";
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const updateUserRating = () => {
        (async function() {
            setIsError(false);
            setIsLoading(true);
            if (!Number.isInteger(parseInt(userRating))) {
                // not a number
                console.log("Not a number");
                return;
            }
            await fetch("http://it2810-19.idi.ntnu.no:3000/api/user/" + id + '/' + userRating.toString(), {
                method: 'PUT'
            })
                .catch( error => {
                    console.log('Could not update selected movie in DB');
                    setIsError(true);
                });
            setIsLoading(false);
        })();
    }

    const movieChange = useCallback((json) => {
        setMovie(json);
    }, []);

    useEffect( () => {
        (async function() {
            setIsError(false);
            setIsLoading(true);
            setId(select_id);
            if (!modalVisible) {
                return;
            }
            await fetch("http://it2810-19.idi.ntnu.no:3000/api/id/" + id)
                .then( res => res.json())
                .then( mov => {
                    movieChange(mov);
                })
                .catch( error => {
                    console.log('Could not get selected movie from DB');
                    setIsError(true);
                });
            setIsLoading(false);
        })();
    }, [movie, select_id]);

    duration = movie["duration"]
    duration = duration.slice(2);
    duration = duration.substring(0, duration.length - 1);
    duration += " min";

    return (
        <ScrollView style={styles.scrollContainer}>
            <Icon name='close' style={styles.icon} onPress={() => updateModalVisible(false)} />
            <View style={styles.container}>
                <Image source={{uri: movie["posterurl"] ? movie["posterurl"] : "https://previews.123rf.com/images/latkun/latkun1712/latkun171200130/92172856-empty-transparent-background-seamless-pattern.jpg"}}
                    resizeMethod={'auto'} style={styles.image}/>
                <View style={styles.textarea}>
                    <Text style={styles.header}>{movie["title"]}</Text>
                    <Text style={styles.text}>Year: {movie["year"]}</Text>
                    <Text style={styles.text}>Duration: {duration}</Text>
                    <Text style={styles.text}>Genres: {movie["genres"].join(', ')}</Text>
                    <Text style={styles.text}>Main actors: {movie["actors"].join(', ')}</Text>
                    <Text style={styles.text}>IMDB rating: {movie["imdbRating"]? movie["imdbRating"] + "/10" : "Unknown" }</Text>
                    <Text style={styles.text}>Storyline: {movie["storyline"].length > 151 ? movie["storyline"].substring(0, 150) : movie["storyline"] }</Text>
                </View>
                <View>
                    <TextInput style={styles.input} placeholder="Your rating 1-10" onChangeText={score => setUserRating(score)}/>
                    <Button title={"Submit"} onPress={() => updateUserRating()} />
                    <Text style={styles.rating}>Your rating: {movie["userRating"] ? movie["userRating"] : "None yet"}</Text>
                </View>
            </View>
        </ScrollView>
    )
}

export default observer(MovieInfo);