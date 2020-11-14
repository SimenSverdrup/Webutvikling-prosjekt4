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
        backgroundColor: '#EEEEEE',
        width: 300,
        height: 150,
        flex: 1,
        flexDirection: 'row'
    },
    image: {
        width: 100,
        height: 140,
    },
    text: {
        fontSize: 15,
        left: 20,
        top: 20
    },
    header: {
        fontSize: 18,
        fontWeight: "bold",
        left: 20,
        bottom: 5,
        top: 5
    },
    flexbox: {
        flex: 1,
        flexDirection: 'column',
        width: 1
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
            <Image source={{uri: props.imgUrl ? props.imgUrl : "https://previews.123rf.com/images/latkun/latkun1712/latkun171200130/92172856-empty-transparent-background-seamless-pattern.jpg"}}
                   resizeMethod={'auto'} style={styles.image}/>
            <View style={styles.flexbox}>
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
