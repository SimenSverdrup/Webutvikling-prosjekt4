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
        marginTop: 1,
        marginLeft: 3,
        marginRight: 3,
        borderRadius: 5,
        backgroundColor: '#EEEEEE',
        width: 300,
        height: 180,
        flex: 1,
        flexDirection: 'row',
        minWidth: 0,
    },
    image: {
        width: 110,
        height: 170,
        margin: 5,
    },
    text: {
        fontSize: 15,
        marginLeft: 15,
        marginTop: 9,
        minWidth: 0,
    },
    header: {
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 15,
        marginBottom: 5,
        marginTop: 7,
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
