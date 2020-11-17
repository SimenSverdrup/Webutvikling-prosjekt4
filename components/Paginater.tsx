import React, {useCallback, useContext, useEffect, useState} from "react";
// @ts-ignore
import Dots from 'react-native-dots-pagination';
import Triangle from 'react-native-triangle';
import Store from '../mobx/store';
import {View} from "react-native";


const Paginater = () => {
    const store = useContext(Store);
    const { updatePage, search_string, genre } = store;
    const [numberOfMovies, setNumberOfMovies] = useState(119);
    const [currentPage, setCurrentPage] = useState(0);

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const movieChange = useCallback((json) => {
        let movies = []
        movies = json;
        let counter = 0;

        movies.map(() => {
            counter += 1;
        })

        setNumberOfMovies(counter);
    }, []);

    const pageChange = (pageChange: number) => {
        if ((currentPage + pageChange) >= 0) {
            setCurrentPage(currentPage + pageChange);
            updatePage(currentPage);
        }
    }

    useEffect( () => {
        updatePage(currentPage);
    }, [currentPage]);

    useEffect( () => {
        (async function() {
            setCurrentPage(0);
            setIsError(false);
            setIsLoading(true);
            if (genre !== "*") {
                // genre is set
                let temp_search_string = search_string === "" ? "*" : search_string;
                console.log("update genre")
                await fetch("http://it2810-19.idi.ntnu.no:3000/api/movies/genre/" + temp_search_string + '/' + genre + '/*/0/120',
                    {
                        method: 'GET'
                    })
                    .then(res => res.json())
                    .then(json => {
                        movieChange(json);
                    })
                    .catch(error => {
                        console.log('Could not get movies from DB');
                        setIsError(true);
                    });
            }
            else {
                // genre is not set
                if (search_string) {
                    // non-empty search string -> search for the specified title
                    await fetch("http://it2810-19.idi.ntnu.no:3000/api/movies/title/" + search_string + '/*/0/120',
                        {
                            method: 'GET'
                        })
                        .then(res => res.json())
                        .then(json => {
                            movieChange(json);
                        })
                        .catch(error => {
                            console.log('Could not get movies from DB');
                            setIsError(true);
                        });
                } else {
                    // empty search string -> get all movies
                    await fetch("http://it2810-19.idi.ntnu.no:3000/api/movies/*/0/120",
                        {
                            method: 'GET'
                        })
                        .then(res => res.json())
                        .then(json => {
                            movieChange(json);
                        })
                        .catch(error => {
                            console.log('Could not get movies from DB');
                            setIsError(true);
                        });
                }
            }
            setIsLoading(false);
        })();
    }, [search_string, genre]);


    return(
        <View>
            <Dots length={Math.ceil(numberOfMovies/5)} active={currentPage} />

            <View style={{marginTop: 20,
                marginLeft: 75,
                flexDirection: "row",
            }}>
                <View onTouchEnd={() => pageChange(-1)} style={{marginHorizontal: 50}}>
                    <Triangle
                        width={30}
                        height={40}
                        color={'#575757'}
                        direction={'left'}
                    />
                </View>
                <View onTouchEnd={() => {
                    if (currentPage + 1 < Math.ceil(numberOfMovies/5)) {
                        pageChange(1);
                    }
                }}>
                    <Triangle
                        width={30}
                        height={40}
                        color={'#575757'}
                        direction={'right'}
                    />
                </View>
            </View>
        </View>
    )
}

export default Paginater;