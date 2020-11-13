import React, {useContext} from 'react';
import Store from '../mobx/store'
import {Image, View, StyleSheet, Text} from "react-native";


interface Props {
    id: string;
    title: string;
    duration: string;
    genres: string[];
    imgUrl: string;
    year: number;
    imdbRating: number;
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 1,
        paddingLeft: 3,
        paddingRight: 3,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#000',
        width: 300,
    },
    image: {
        width: 70,
        height: 110,
    },
    text: {
        fontSize: 15
    },
    header: {
        fontSize: 18,
        fontWeight: "bold"
    }
});

const MovieBox = (props: Props) => {
    const store = useContext(Store);
    const { updateSelect } = store;
    let duration = props.duration.slice(2);
    duration = duration.substring(0, duration.length - 1);
    duration += " min";
    let imdbRating = "Unknown";

    if (props.imdbRating) {
        imdbRating = props.imdbRating.toString();
        imdbRating += "/10";
    }

    return (
        <View style={styles.container} onTouchEnd={() => {
            updateSelect(props.id);
        }}>
            <Image source={{uri: props.imgUrl}} resizeMethod={'auto'} style={styles.image}/>
            <View>
                <Text style={styles.header}>{props.title}</Text>
                <Text style={styles.text}>Duration: {duration}</Text>
                <Text style={styles.text}>Genre: {props.genres.join(', ')}</Text>
                <Text style={styles.text}>Year: {props.year.toString()}</Text>
                <Text style={styles.text}>IMDB Rating: {imdbRating}</Text>
            </View>
        </View>
    )
}

export default MovieBox;
