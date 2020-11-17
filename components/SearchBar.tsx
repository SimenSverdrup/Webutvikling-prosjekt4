import React, {useContext, useEffect, useState} from 'react';
import Store from '../mobx/store';
import { View } from 'react-native';
import { observer } from 'mobx-react';
import { SearchBar as SB } from 'react-native-elements';


const SearchBar = () => {
    const store = useContext(Store);
    const { updateSearch, search_string } = store;
    const [search, setSearch] = useState('');

    const handleSearch = (text: string) => {
        setSearch(text);
    }

    useEffect(() => {
            updateSearch(search);
    }, [search]);


    return (
        <View>
            <SB
                round
                searchIcon={{ size: 24 }}
                onChangeText={(text) => {
                    handleSearch(text)
                }}
                onClear={() => handleSearch('')}

                placeholder="Search for movie titles..."
                value={search}
            />
        </View>
    )
}

export default observer(SearchBar);
