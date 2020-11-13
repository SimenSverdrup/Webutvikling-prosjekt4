import React, {useContext, useEffect, useState} from 'react';
import { observer } from "mobx-react"
import Store from '../mobx/store'
import {Button, Image, StyleSheet, Text, TextInput, View} from "react-native";


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
        paddingTop: 3,
        paddingLeft: 3,
        paddingRight: 3,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#000',
        width: 360,
        height: 700
    },
    image: {
        width: 110,
        height: 180,
    },
    text: {
        fontSize: 18
    },
    header: {
        fontSize: 25,
        fontWeight: "bold"
    }
});

const MovieInfo = () => {
    const store = useContext(Store);
    const { select_id, updateModalVisible } = store;
    const [id, setId] = useState(select_id);
    const [movie, setMovie] = useState(initialMovie);
    const [userRating, setUserRating] = useState("");

    let duration = "Unknown";

    const updateUserRating = () => {
        if (!Number.isInteger(parseInt(userRating))) {
            // not a number
            console.log("Not a number");
            return;
        }
        fetch("http://it2810-19.idi.ntnu.no:3000/api/user/" + id + '/' + userRating.toString(), {
            method: 'PUT'
        })
            .catch( error => {
                console.log('Could not update selected movie in DB');
            });
    }

    useEffect( () => {
        setId(select_id);
        fetch("http://it2810-19.idi.ntnu.no:3000/api/id/" + id)
            .then( res => res.json())
            .then( mov => {
                setMovie(mov);
            })
            .catch( error => {
                console.log('Could not get selected movie from DB');
            });
    }, [movie, select_id]);

    duration = movie["duration"]
    duration = duration.slice(2);
    duration = duration.substring(0, duration.length - 1);
    duration += " min";

    return (
        <View onTouchEnd={() => {
            updateModalVisible(false)}}
            style={styles.container}
        >
            <Text style={styles.header}>{movie["title"]}</Text>
            <Image source={{uri: movie["posterurl"]}} resizeMethod={'auto'} style={styles.image}/>
            <View>
                <Text style={styles.text}>Year: {movie["year"]}</Text>
                <Text style={styles.text}>Duration: {duration}</Text>
                <Text style={styles.text}>Genres: {movie["genres"].join(', ')}</Text>
                <Text style={styles.text}>Main actors: {movie["actors"].join(', ')}</Text>
                <Text style={styles.text}>IMDB rating: {movie["imdbRating"]? movie["imdbRating"] + "/10" : "Unknown" }</Text>
                <Text style={styles.text}>Storyline: {movie["storyline"].length > 341 ? movie["storyline"].substring(0, 340) : movie["storyline"] }</Text>
                <TextInput placeholder="1-10" onChange={text => setUserRating(text.toString())} value={userRating}>Rate this movie:</TextInput>
                <Button title={"Submit"} onPress={() => updateUserRating()}/>
                <Text style={styles.text}>Your rating: {movie["userRating"] ? movie["userRating"] : "None yet"}</Text>
            </View>
        </View>
    )
}

export default observer(MovieInfo);