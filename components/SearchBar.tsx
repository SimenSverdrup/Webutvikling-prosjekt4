import React, { useContext }from 'react';
import Store from '../mobx/store';
//import MenuListComposition1 from "./DropdownSort";
//import LongMenu from "./dropdownFilterSlider";
import { TextInput, View } from 'react-native';


const SearchBar = () => {
    const store = useContext(Store);
    const { updateSearch } = store;

    return (
        <View>
            <TextInput style={{height: 50}}
               placeholder="Search for movie titles"
               onChangeText={(search) => {
                   //use action here, to set search string state in the store
                   // this will trigger a re-render of MovieList automatically
                   updateSearch(search);
               }}
               defaultValue={""}/>
            {/*
            <View>
                <MenuListComposition1/>
            </View>
            <View>
                <LongMenu/>
            </View>
            */}
        </View>
    )
}

export default SearchBar;
