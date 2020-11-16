// @ts-ignore
import { SliderPaginationView } from 'react-native-slider-pagination';
import React, {useContext, useEffect, useState} from "react";
import Store from '../mobx/store';


const Paginater = () => {
    const store = useContext(Store);
    const { updatePage, search_string, genre } = store;
    let numberOfMovies = 0;

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect( () => {
            (async function() {
                setIsError(false);
                setIsLoading(true);
                if (genre !== "*") {
                    let temp_search_string = search_string === "" ? "*" : search_string;
                    console.log("update genre")
                    await fetch("http://it2810-19.idi.ntnu.no:3000/api/movies/genre/" + temp_search_string + '/' + genre + '/*/0/200',
                        {
                            method: 'GET'
                        })
                        .then(res => res.json())
                        .then(json => {
                            numberOfMovies = Object.keys(json).length;
                        })
                        .catch(error => {
                            console.log('Could not get movies from DB');
                            setIsError(true);
                        });
                }
                else {
                    if (search_string) {
                        // non-empty search string -> search for the specified title
                        await fetch("http://it2810-19.idi.ntnu.no:3000/api/movies/title/" + search_string + '/*/0/200',
                            {
                                method: 'GET'
                            })
                            .then(res => res.json())
                            .then(json => {
                                numberOfMovies = Object.keys(json).length;
                            })
                            .catch(error => {
                                console.log('Could not get movies from DB');
                                setIsError(true);
                            });
                    } else {
                        // empty search string -> get all movies
                        await fetch("http://it2810-19.idi.ntnu.no:3000/api/movies/*/0/200",
                            {
                                method: 'GET'
                            })
                            .then(res => res.json())
                            .then(json => {
                                numberOfMovies = Object.keys(json).length;
                            })
                            .catch(error => {
                                console.log('Could not get movies from DB');
                                setIsError(true);
                            });
                    }
                }
                setIsLoading(false);
            })();
        console.log("Number of movies matching search: " + numberOfMovies);
    }, [search_string, genre]);

    return(
        <SliderPaginationView
            pageCount={Math.ceil(numberOfMovies/5)}
            onPageChange={(page: number) => updatePage(page-1)}
        />
    )
}

export default Paginater;