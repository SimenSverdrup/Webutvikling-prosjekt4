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
        //paddingTop: 3,
        //paddingLeft: 3,
        //paddingRight: 3,
        //borderRadius: 5,
        //borderWidth: 0.5,
        //borderColor: '#000',
        //width: 360,
        //height: 700,
        flex: 1,
        flexDirection: "column"
    },
    image: {
        width: 110,
        height: 180,
        top: 50,
        left: 20,
    },
    text: {
        
    },
    ratingWrapper: {
        alignContent: "center",
        paddingTop: 5
    },
    rating: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        paddingTop: 10,
        paddingBottom: 50
    },
    header: {
        fontSize: 25,
        fontWeight: "bold",
        top: 35,
        left: 20
    },
    input: {
        borderColor: '#C9C9C9',
        borderStyle: "solid",
        borderRadius:  5,
        top: 100,
        left: 20,
        backgroundColor: "blue",
    },
    textarea: {
        top: 70,
        fontSize: 18,
        color: "red",
        left: 20,
        right: 20,
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
        <View style={styles.container}>
            <Text style={styles.header}>{movie["title"]}</Text>
            <Image source={{uri: movie["posterurl"] ? movie["posterurl"] : "https://previews.123rf.com/images/latkun/latkun1712/latkun171200130/92172856-empty-transparent-background-seamless-pattern.jpg"}}
                   resizeMethod={'auto'} style={styles.image}/>
            <View style={styles.textarea}>
                <Text>Year: {movie["year"]}</Text>
                <Text>Duration: {duration}</Text>
                <Text>Genres: {movie["genres"].join(', ')}</Text>
                <Text>Main actors: {movie["actors"].join(', ')}</Text>
                <Text>IMDB rating: {movie["imdbRating"]? movie["imdbRating"] + "/10" : "Unknown" }</Text>
                <Text>Storyline: {movie["storyline"].length > 151 ? movie["storyline"].substring(0, 150) : movie["storyline"] }</Text>
            </View>
            <View style={styles.ratingWrapper}>
                <TextInput style={styles.input} placeholder="Your rating 1-10" onChangeText={score => setUserRating(score)}/>
                <Button title={"Submit"} onPress={() => updateUserRating()} />
                <Text style={styles.rating}>Your rating: {movie["userRating"] ? movie["userRating"] : "None yet"}</Text>
                <Button title={"Close"} onPress={() => updateModalVisible(false)} color={"#9c9c9c"}/>
            </View>
        </View>
    )
}

export default observer(MovieInfo);